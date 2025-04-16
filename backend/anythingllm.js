
const axios = require('axios');

async function queryAnythingLLM(question) {
  const res = await axios.post('https://api.anythingllm.xyz/query', {
    query: question
  }, {
    headers: {
      'Authorization': 'Bearer 093VXKD-FMJ4FYZ-K6H6B03-36M6ATK',
      'Content-Type': 'application/json'
    }
  });

  return res.data.answer || '';
}

module.exports = queryAnythingLLM;
