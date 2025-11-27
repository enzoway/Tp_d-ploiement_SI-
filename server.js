const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import de la connexion à la base de données
const db = require('./config/db');

const automateRoutes = require('./routes/automates');
const variableRoutes = require('./routes/variables');
const mesureRoutes = require('./routes/mesures');
const lancerScrutation = require('./services/automate1');

// --- PROTECTION CONTRE LE CRASH DU SERVEUR ---
process.on('uncaughtException', (err) => {
    console.error('💥 ERREUR NON GÉRÉE (Le serveur reste allumé) :', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 PROMESSE REJETÉE (Le serveur reste allumé) :', reason);
});
// ---------------------------------------------

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/automates', automateRoutes);
app.use('/api/variables', variableRoutes);
app.use('/api/mesures', mesureRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API de supervision industrielle' });
});

// Route de test de connexion à la base de données
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ message: 'Connexion à la base de données réussie', rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  lancerScrutation();
});