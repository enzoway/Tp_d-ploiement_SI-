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

// Créer une variable (CORRIGÉ SELON L'IMAGE DE TA BDD)
exports.createVariable = async (req, res) => {
  // On récupère 'type' (comme dans ta bdd) et non 'type_variable'
  const { nom, automate_id, registre, frequence, unite, min, max, type } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO variables (nom, automate_id, registre, frequence, unite, min, max, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nom, automate_id, registre, frequence, unite, min, max, type || 'coil'] 
    );
    res.status(201).json({ id: result.insertId, message: "OK" });
  } catch (error) {
    console.error("Erreur insertion variable:", error); // Utile pour déboguer
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour
exports.updateVariable = async (req, res) => {
  const { nom, registre, frequence, unite, min, max, type } = req.body;
  try {
    await db.query(
      'UPDATE variables SET nom = ?, registre = ?, frequence = ?, unite = ?, min = ?, max = ?, type = ? WHERE id = ?',
      [nom, registre, frequence, unite, min, max, type, req.params.id]
    );
    res.json({ message: 'Variable mise à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer
exports.deleteVariable = async (req, res) => {
  try {
    await db.query('DELETE FROM variables WHERE id = ?', [req.params.id]);
    res.json({ message: 'Variable supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};