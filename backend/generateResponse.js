const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateResponse(patientData, llmKnowledge, question) {
  const systemPrompt = \`
Tu es un assistant virtuel en rééducation, destiné à répondre aux questions des patients.
Tu t'appuies sur les consignes générales fournies par les kinésithérapeutes (ci-dessous), et tu personnalises ta réponse en fonction des données du patient.
\`;

  const context = \`
Infos patient :
- ID : \${patientData.id}
- Nom : \${patientData.nom}
- Pathologie : \${patientData.pathologie}
- Objectif : \${patientData.objectif}
- Remarques kiné : \${patientData.remarques}
- Niveau : \${patientData.niveau}

Connaissances générales (AnythingLLM) :
\${llmKnowledge}
\`;

  const messages = [
    { role: 'system', content: systemPrompt + context },
    { role: 'user', content: question }
  ];

  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
  });

  return chat.choices[0].message.content;
}

module.exports = generateResponse;
