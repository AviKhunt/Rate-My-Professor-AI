import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.Index("chatbot");
const data = JSON.parse(fs.readFileSync("data/reviews.json", "utf-8"));

async function getEmbedding(text) {
  var res = await fetch(
    "https://router.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.HUGGINGFACE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    }
  );
  var json = await res.json();

  // Handle all possible response formats
  if (Array.isArray(json) && Array.isArray(json[0]) && typeof json[0][0] === "number") {
    return json[0];
  }
  if (Array.isArray(json) && typeof json[0] === "number") {
    return json;
  }
  // If model returns nested deeper
  if (json && json[0] && Array.isArray(json[0][0])) {
    return json[0][0];
  }
  console.log("WARNING: Unexpected format:", JSON.stringify(json).substring(0, 300));
  return null;
}

async function seed() {
  console.log("Loading " + data.reviews.length + " reviews...");
  var vectors = [];

  for (var i = 0; i < data.reviews.length; i++) {
    var r = data.reviews[i];
    var text = "Professor: " + r.professor + ". Subject: " + r.subject + ". Rating: " + r.stars + " stars. Review: " + r.review;
    console.log("Embedding " + (i + 1) + "/" + data.reviews.length + ": " + r.professor);

    var embedding = await getEmbedding(text);

    if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
      console.log("  SKIPPING - bad embedding, retrying once...");
      await new Promise(function(r) { setTimeout(r, 2000); });
      embedding = await getEmbedding(text);
    }

    if (embedding && Array.isArray(embedding) && embedding.length > 0) {
      vectors.push({
        id: "review-" + i,
        values: embedding,
        metadata: { professor: r.professor, subject: r.subject, stars: r.stars, review: r.review },
      });
      console.log("  OK - length: " + embedding.length);
    } else {
      console.log("  FAILED - skipping this review");
    }
  }

  console.log("\nUploading " + vectors.length + " vectors to Pinecone...");
  // Upload in small batches of 5
  for (var j = 0; j < vectors.length; j += 5) {
    var batch = vectors.slice(j, j + 5);
    await index.upsert(batch);
    console.log("Uploaded batch " + (Math.floor(j/5) + 1));
  }
  console.log("Done! " + vectors.length + " reviews loaded into Pinecone.");
}

seed().catch(console.error);