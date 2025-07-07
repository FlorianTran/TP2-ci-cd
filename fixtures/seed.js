const { query, initDatabase } = require('../src/db/connection');

async function seedDatabase() {
  try {
    console.log('Initialisation de la base de données...');
    await initDatabase();
    
    console.log('Insertion des données de test...');
    
    // Vérifier si des données existent déjà
    const existingData = await query('SELECT COUNT(*) as count FROM submissions');
    
    if (existingData[0].count === 0) {
      // Insérer des données de test
      const testData = [
        { name: 'Alice Martin', email: 'alice.martin@example.com' },
        { name: 'Bob Dupont', email: 'bob.dupont@example.com' },
        { name: 'Claire Dubois', email: 'claire.dubois@example.com' }
      ];
      
      for (const data of testData) {
        await query(
          'INSERT INTO submissions (name, email) VALUES (?, ?)',
          [data.name, data.email]
        );
      }
      
      console.log(`${testData.length} enregistrements de test insérés`);
    } else {
      console.log('Des données existent déjà, pas d\'insertion de données de test');
    }
    
    console.log('Base de données initialisée avec succès');
    process.exit(0);
  } catch (err) {
    console.error('Erreur lors de l\'initialisation:', err);
    process.exit(1);
  }
}

seedDatabase(); 