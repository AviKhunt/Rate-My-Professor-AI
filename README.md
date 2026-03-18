# 🤖 Rate My Professor AI

An AI-powered professor rating assistant that uses **Retrieval-Augmented Generation (RAG)** to help students find and evaluate professors through natural conversation.

**Live Demo:** [rate-my-professor-ai.vercel.app](https://rate-my-professor-ai.vercel.app/welcome)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![Gemini](https://img.shields.io/badge/Gemini_API-blue?logo=google)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-purple)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white)

---

## ✨ Features

- **Semantic Search** — Uses Pinecone vector database to find professors by meaning, not just keywords
- **RAG Pipeline** — Combines retrieved professor data with Gemini AI for accurate, context-aware responses
- **Real-time Chat UI** — Sleek chat interface built with Material UI and Framer Motion animations
- **HuggingFace Embeddings** — Converts queries into vector embeddings using `sentence-transformers/all-MiniLM-L6-v2`
- **Responsive Design** — Works seamlessly on desktop and mobile

## 🏗️ Architecture

```
User Query → HuggingFace Embedding → Pinecone Vector Search → Top-K Results → Gemini AI → Response
```

1. User asks a question about a professor
2. Query is converted to a vector embedding via HuggingFace
3. Pinecone performs semantic similarity search across stored reviews
4. Top 5 most relevant reviews are retrieved
5. Gemini AI generates a helpful response using the retrieved context

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, Material UI, Framer Motion, Tailwind CSS |
| Backend | Next.js API Routes |
| AI/LLM | Google Gemini 1.5 Flash |
| Vector DB | Pinecone |
| Embeddings | HuggingFace Inference API |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- API keys for: [Gemini](https://aistudio.google.com/apikey), [Pinecone](https://app.pinecone.io), [HuggingFace](https://huggingface.co/settings/tokens)

### Installation

```bash
# Clone the repo
git clone https://github.com/AviKhunt/Rate-My-Professor-AI.git
cd Rate-My-Professor-AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual API keys

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Loading Data into Pinecone

Use the included Jupyter notebook to load professor review data:

```bash
pip install pinecone-client openai python-dotenv huggingface_hub
jupyter notebook load.ipynb
```

## 📁 Project Structure

```
Rate-My-Professor-AI/
├── app/
│   ├── api/chat/
│   │   └── route.js        # RAG API endpoint (Gemini + Pinecone)
│   ├── welcome/
│   │   └── page.js         # Landing page
│   ├── page.js             # Chat interface
│   ├── layout.js           # Root layout
│   └── globals.css         # Global styles
├── data/
│   └── reviews.json        # Professor review dataset
├── public/                  # Static assets
├── load.ipynb              # Pinecone data loading notebook
├── package.json
├── tailwind.config.js
└── next.config.mjs
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
