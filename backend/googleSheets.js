const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');

// Écrit GOOGLE_CREDENTIALS_JSON dans un fichier temporaire
const rawCredentials = process.env.GOOGLE_CREDENTIALS_JSON;

const tempPath = './temp_credentials.json';
fs.writeFileSync(tempPath, rawCredentials, 'utf8');

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
