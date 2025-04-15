
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
console.log("Clé API détectée :", process.env.OPENAI_API_KEY);
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const userMsg = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un assistant de rééducation pour patients. Tu tutoies le patient, tu restes clair, bienveillant, et professionnel.",
        },
        { role: "user", content: userMsg },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Erreur OpenAI:", error.message);
    res.status(500).json({ reply: "Erreur GPT-4 : " + error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend lancé sur le port ${PORT}`));
