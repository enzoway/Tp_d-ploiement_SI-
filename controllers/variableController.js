const db = require('../config/db');

// Récupérer toutes les variables
exports.getAllVariables = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, a.nom as automate_nom 
      FROM variables v 
      LEFT JOIN automates a ON v.automate_id = a.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les variables d'un automate
exports.getVariablesByAutomate = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM variables WHERE automate_id = ?',
      [req.params.automateId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une variable
exports.createVariable = async (req, res) => {
  const { nom, automate_id, registre, frequence, unite } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO variables (nom, automate_id, registre, frequence, unite) VALUES (?, ?, ?, ?, ?)',
      [nom, automate_id, registre, frequence, unite]
    );
    res.status(201).json({ id: result.insertId, nom, automate_id, registre, frequence, unite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une variable
exports.updateVariable = async (req, res) => {
  const { nom, registre, frequence, unite } = req.body;
  try {
    await db.query(
      'UPDATE variables SET nom = ?, registre = ?, frequence = ?, unite = ? WHERE id = ?',
      [nom, registre, frequence, unite, req.params.id]
    );
    res.json({ message: 'Variable mise à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une variable
exports.deleteVariable = async (req, res) => {
  try {
    await db.query('DELETE FROM variables WHERE id = ?', [req.params.id]);
    res.json({ message: 'Variable supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
