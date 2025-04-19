// Simulation de réponse d'AnythingLLM (aucun appel réseau réel)

async function queryAnythingLLM(question) {
  console.log("Simulation AnythingLLM pour la question :", question);
  return "Réponse simulée depuis AnythingLLM (aucune documentation utilisée).";
}

module.exports = queryAnythingLLM;
