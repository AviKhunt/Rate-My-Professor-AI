import "./globals.css";

export const metadata = {
  title: "Rate My Professor AI",
  description:
    "AI-powered professor rating assistant using RAG and semantic search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
