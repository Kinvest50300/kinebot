const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');

// Étape 1 : Lire et parser la variable d'environnement
const raw = process.env.GOOGLE_CREDENTIALS_JSON;
const parsed = JSON.parse(raw);

// Étape 2 : Corriger les sauts de ligne dans private_key
parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');

// Étape 3 : Écrire le JSON corrigé dans un fichier temporaire
const tempPath = './temp_credentials.json';
fs.writeFileSync(tempPath, JSON.stringify(parsed), 'utf8');

// Étape 4 : Charger les credentials à partir du fichier
const credentials = require(tempPath);

async function getPatientData(patientId) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const spreadsheetId = '1zseswS93_QF9Xp_51JshS_Q9bhK82yPB9gJrm8gHguY';
  const range = 'Feuille1!A2:F';

  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) return null;

  const patient = rows.find(row => row[0] === patientId);
  if (!patient) return null;

  return {
    id: patient[0],
    nom: patient[1],
    pathologie: patient[2],
    objectif: patient[3],
    remarques: patient[4],
    niveau: patient[5],
  };
}

module.exports = getPatientData;
