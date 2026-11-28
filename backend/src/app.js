
import express from "express";
import cors from "cors";

import conteudoPortfolioRoutes from "./routes/conteudoPortfolioRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.status(200).json({
    mensagem: "API do portfólio funcionando!"
  });
});

app.use("/api/portfolio/conteudo", conteudoPortfolioRoutes);
app.use("/api/auth", authRoutes);

export default app;
