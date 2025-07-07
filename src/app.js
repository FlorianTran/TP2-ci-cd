const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./db/connection');
const submissionsRouter = require('./routes/submissions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', submissionsRouter);

// Initialisation de la base de données
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (err) {
    console.error('Erreur lors du démarrage:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app; 