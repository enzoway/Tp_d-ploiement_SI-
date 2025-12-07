const db = require('../config/db');

// Récupérer toutes les mesures (avec pagination)
exports.getAllMesures = async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const offset = parseInt(req.query.offset) || 0;
  
  try {
    const [rows] = await db.query(`
      SELECT m.*, v.nom as variable_nom 
      FROM mesures m 
      LEFT JOIN variables v ON m.variable_id = v.id 
      ORDER BY m.horodatage DESC 
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les mesures d'une variable
exports.getMesuresByVariable = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM mesures WHERE variable_id = ? ORDER BY horodatage DESC',
      [req.params.variableId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les mesures par plage de dates
exports.getMesuresByDateRange = async (req, res) => {
  const { start, end, variableId } = req.query;
  try {
    const [rows] = await db.query(
      'SELECT * FROM mesures WHERE variable_id = ? AND horodatage BETWEEN ? AND ? ORDER BY horodatage DESC',
      [variableId, start, end]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une mesure
exports.createMesure = async (req, res) => {
  const { variable_id, valeur, horodatage } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO mesures (variable_id, valeur, horodatage) VALUES (?, ?, ?)',
      [variable_id, valeur, horodatage || new Date()]
    );
    res.status(201).json({ id: result.insertId, variable_id, valeur, horodatage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
