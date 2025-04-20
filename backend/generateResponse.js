const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateResponse(patientData, llmKnowledge, question) {
const systemPrompt = `
Tu es un assistant virtuel spécialisé en rééducation pour les patients d’un kinésithérapeute.

🎯 Ta mission :
- Répondre aux questions du patient de manière claire, professionnelle et rassurante
- Adopter un ton amical, bienveillant et en le tutoyant
- T'appuyer sur :
  - ✅ Les consignes générales issues de la base de documents (AnythingLLM)
  - ✅ Les informations personnelles du patient (pathologie, objectif, remarques du kiné)

🧾 Style de réponse :
- Sois bref, clair, et précis
- N’hésite pas à structurer en bullet points en allant à la ligne pour plus de lisibilité (surtout pour les exercices ou conseils pratiques)
- Utilise un langage simple, sans jargon médical complexe
- Rappelle-toi que tu parles à une seule personne (le patient)

✅ Objectif : aider le patient à mieux comprendre sa rééducation, ses exercices et ses objectifs.
`;


  const context = `
Infos patient :
- ID : ${patientData.id}
- Nom : ${patientData.nom}
- Pathologie : ${patientData.pathologie}
- Objectif : ${patientData.objectif}
- Remarques kiné : ${patientData.remarques}
- Niveau : ${patientData.niveau}

Connaissances générales (AnythingLLM) :
${llmKnowledge}
`;

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
