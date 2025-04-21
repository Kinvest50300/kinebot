const axios = require('axios');

async function queryAnythingLLM(question) {
  console.log("Appel réel à AnythingLLM :", question);

  try {
    const res = await axios.post('https://anything-llm-back.onrender.com/query', {
      query: question
    }, {
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer VOTRE_CLE_API' // décommentez et remplacez si nécessaire
      }
    });

    console.log("Réponse brute AnythingLLM :", res.data);
    return res.data.answer || '';
  } catch (err) {
    console.error("❌ Erreur lors de l'appel à AnythingLLM :", err.message);
    return "Je n'ai pas pu consulter la documentation pour le moment.";
  }
}

module.exports = queryAnythingLLM;
