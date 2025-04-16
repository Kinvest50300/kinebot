
# KinéBot 🤖  
**Assistant IA pour kinésithérapeutes et patients**

KinéBot est un assistant intelligent connecté à GPT-4, qui aide les patients à mieux comprendre et suivre leur rééducation. Il personnalise ses réponses en s'appuyant sur deux sources de données :
- 📄 Une base de documents professionnels via AnythingLLM
- 📊 Des informations spécifiques à chaque patient stockées dans Google Sheets

---

## 🔥 Fonctionnalités principales

- 💬 Chatbot disponible via une interface web responsive
- 🧠 Réponses générées par GPT-4 et contextualisées
- 📑 Accès aux documents métier des kinés via AnythingLLM
- 👤 Personnalisation des réponses selon chaque patient
- 📈 Connexion automatique à la fiche patient dans Google Sheets
- 🔐 Sécurité des données (pas de secrets dans GitHub)

---

## 🚀 Lancer le projet en local

### 📦 Backend

```bash
cd backend
npm install
# Créer un fichier .env contenant :
# OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
npm start
```

### 🌐 Frontend (si séparé)

```bash
cd frontend
npm install
npm start
```

---

## ⚙️ Fichiers sensibles à ne pas versionner

Assure-toi que `.gitignore` contient bien :

```
.env
*.env
credentials.json
```

---

## 🌐 Déploiement

- **Frontend** : [https://kinebot.vercel.app](https://kinebot.vercel.app)
- **Backend** : [https://kinebot-api.onrender.com](https://kinebot-api.onrender.com)

---

## 🛠️ Stack technique

- React (frontend)
- Node.js + Express (backend)
- OpenAI GPT-4
- Google Sheets API
- AnythingLLM

---

## 🙌 Auteur

Développé par Bolek & Valentin
