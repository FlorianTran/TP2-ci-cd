const express = require('express');
const { query } = require('../db/connection');

const router = express.Router();

// Validation des données
function validateSubmission(data) {
  const errors = [];
  
  if (!data.name || data.name.trim() === '') {
    errors.push('Le nom est requis');
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.push('L\'email est requis');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('L\'email n\'est pas valide');
    }
  }
  
  return errors;
}

// GET / - Afficher le formulaire
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// POST /submit - Traiter le formulaire
router.post('/submit', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validation
    const errors = validateSubmission({ name, email });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    // Insertion en base
    const result = await query(
      'INSERT INTO submissions (name, email) VALUES (?, ?)',
      [name.trim(), email.trim()]
    );
    
    res.status(201).json({ 
      message: 'Soumission enregistrée avec succès',
      id: Number(result.insertId) // Correction BigInt
    });
  } catch (err) {
    console.error('Erreur lors de l\'insertion:', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /submissions - Afficher la liste des soumissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(submissions);
  } catch (err) {
    console.error('Erreur lors de la récupération:', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router; 