const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const getPatientData = require('./googleSheets');
const queryAnythingLLM = require('./anythingllm');
const generateResponse = require('./generateResponse');

const app = express();

// CORS complet : autoriser Vercel + localhost + toutes les routes + OPTIONS
const allowedOrigins = ['http://localhost:3000', 'https://kinebot.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.options('*', cors()); // Gérer les pré-requêtes pour toutes les routes

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, patientId } = req.body;

  try {
    if (!patientId) throw new Error("Identifiant patient manquant.");
    if (!message) throw new Error("Message vide.");

    const patientData = await getPatientData(patientId);
    if (!patientData) throw new Error("Patient introuvable dans Google Sheets.");

    const llmKnowledge = await queryAnythingLLM(message);
    const reply = await generateResponse(patientData, llmKnowledge, message);
    res.json({ reply });
  } catch (error) {
    console.error("Erreur personnalisée :", error.message);
    res.status(500).json({ reply: "Erreur : " + error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend lancé sur le port ${PORT}`));
