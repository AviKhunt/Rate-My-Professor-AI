import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `You are a helpful and friendly "Rate My Professor" AI assistant. Your job is to help students find information about professors based on their reviews and ratings.

When answering questions:
- Use the provided professor review data to give accurate, helpful responses
- Mention specific professor names, subjects, star ratings, and review highlights
- If multiple professors match, present the top 3 most relevant ones
- Format responses clearly with professor names, ratings (out of 5 stars), subjects, and key review points
- Be encouraging and help students make informed decisions
- If no relevant professors are found in the data, let the student know and offer general advice

For each professor you mention, use this format:
Professor Name - Subject (X/5 stars)
Key highlights from their review.`;

async function getEmbedding(text, apiKey) {
  const res = await fetch(
    "https://router.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    }
  );
  const json = await res.json();
  return json[0];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages;
    const userMessage = messages[messages.length - 1].content;

    // Step 1: Get embedding for user query
    const queryEmbedding = await getEmbedding(userMessage, process.env.HUGGINGFACE_API_KEY);

    // Step 2: Search Pinecone
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.Index("chatbot");

    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    // Step 3: Build context from results
    var context = "Here are the most relevant professor reviews:\n\n";
    for (var i = 0; i < queryResponse.matches.length; i++) {
      var match = queryResponse.matches[i];
      var meta = match.metadata;
      context += (i + 1) + ". Professor: " + meta.professor + "\n";
      context += "   Subject: " + meta.subject + "\n";
      context += "   Rating: " + meta.stars + "/5 stars\n";
      context += "   Review: " + meta.review + "\n";
      context += "   Relevance Score: " + (match.score * 100).toFixed(1) + "%\n\n";
    }

    // Step 4: Generate response with Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = systemPrompt + "\n\n" + context + "\n\nStudent question: " + userMessage + "\n\nProvide a helpful response:";

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return Response.json({ message: response });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { message: "Sorry, I encountered an error. Please try again." },
      { status: 500 }
    );
  }
}