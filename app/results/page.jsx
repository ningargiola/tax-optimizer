"use client"; // Ensure this component is client-side

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import cards from "../../components/cardsData"; // Imports the cards array

export default function Results() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure this code only runs on the client-side
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing on SSR

  return (
    <div className="text-primary-foreground max-w-3xl mx-auto p-5 font-serif">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-light text-[#022c5e]">Your AI Generated Report</h1>
        <div className="flex justify-between items-center border-b border-black pb-2 mt-2">
          <h3 className="text-lg text-black">Your Potential Savings</h3>
          <p className="text-3xl font-light text-[#022c5e]">$77,000</p>
        </div>
      </div>

      {/* Cards Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <i className={`${card.icon} text-[#022c5e] text-2xl`}></i>
              <Typography
                variant="h5"
                sx={{
                  color: "#022c5e",
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                {card.title}
              </Typography>
            </Box>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              {card.advice.map((item, idx) => (
                <li key={idx} style={{ color: "#333", marginBottom: "0.5rem" }}>
                  {item}
                </li>
              ))}
            </ul>
            <Typography
              sx={{
                textAlign: "right",
                color: "#022c5e",
                fontWeight: "bold",
                fontSize: "1.2rem",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              Potential Savings {card.savings}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}