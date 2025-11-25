const db = require('../config/db');

// Récupérer tous les automates
exports.getAllAutomates = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM automates');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un automate par ID
exports.getAutomateById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM automates WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Automate non trouvé' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un automate
exports.createAutomate = async (req, res) => {
  const { nom, adresse_ip } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO automates (nom, adresse_ip) VALUES (?, ?)',
      [nom, adresse_ip]
    );
    res.status(201).json({ id: result.insertId, nom, adresse_ip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un automate
exports.updateAutomate = async (req, res) => {
  const { nom, adresse_ip } = req.body;
  try {
    await db.query(
      'UPDATE automates SET nom = ?, adresse_ip = ? WHERE id = ?',
      [nom, adresse_ip, req.params.id]
    );
    res.json({ message: 'Automate mis à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un automate
exports.deleteAutomate = async (req, res) => {
  try {
    await db.query('DELETE FROM automates WHERE id = ?', [req.params.id]);
    res.json({ message: 'Automate supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
