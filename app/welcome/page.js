"use client";

import { Box, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const features = [
    {
      icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
      title: "AI-Powered",
      description: "Get intelligent insights about professors using advanced AI",
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: "Semantic Search",
      description: "Find professors based on meaning, not just keywords",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: "Smart Ratings",
      description: "Access detailed ratings and reviews powered by RAG",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rate My Professor AI
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, maxWidth: 600, mx: "auto" }}>
          Your AI assistant for finding the perfect professor. Powered by semantic search and
          Retrieval-Augmented Generation.
        </Typography>
      </motion.div>

      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
            mb: 5,
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <Box
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  p: 3,
                  width: 220,
                  border: "1px solid rgba(255,255,255,0.12)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    transform: "translateY(-4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ mb: 1.5, color: "#667eea" }}>{feature.icon}</Box>
                <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {feature.description}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/")}
          sx={{
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #5a6fd6 0%, #6a4190 100%)",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Start Chatting →
        </Button>
      </motion.div>
    </Box>
  );
}
