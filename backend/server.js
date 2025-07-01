import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("PsicoIA Pro Backend is running!");
});

// Rota para gerar o relatório
app.post("/api/generate-report", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("Sending prompt to OpenAI...");
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4.1-nano",
    });

    const report = completion.choices[0].message.content;
    console.log("Report generated successfully.");
    res.json({ report });

  } catch (error) {
    console.error("Error calling OpenAI API:", error.message);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

