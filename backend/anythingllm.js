const axios = require('axios');

async function queryAnythingLLM(question) {
  console.log("Appel à AnythingLLM avec question :", question);

  try {
    const res = await axios.post('https://api.anythingllm.xyz/query', {
      query: question
    }, {
      headers: {
        'Authorization': 'Bearer 093VXKD-FMJ4FYZ-K6H6B03-36M6ATK',
        'Content-Type': 'application/json'
      }
    });

    console.log("Réponse brute AnythingLLM :", res.data);
    return res.data.answer || '';
  } catch (err) {
    console.error("❌ Erreur lors de l'appel à AnythingLLM :", err.message);
    throw err;
  }
}

module.exports = queryAnythingLLM;
