# TP CI/CD - Express.js avec MariaDB

Ce projet implémente un pipeline CI/CD complet avec une application Express.js et une base de données MariaDB.

## 🏗️ Architecture

```
project/
├── src/                # Code applicatif
│   ├── app.js         # Application Express principale
│   ├── routes/        # Routes de l'application
│   └── db/            # Connexion à la BDD
├── public/            # Formulaire HTML
├── tests/
│   ├── unit/          # Tests unitaires
│   └── e2e/           # Tests E2E avec Cypress
├── fixtures/          # Scripts de données de test
└── .github/workflows/ # Pipeline CI/CD
```

## 🚀 Installation

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Configurer la base de données MariaDB
4. Lancer les fixtures : `DB_PASSWORD=pass npm run seed`
5. Démarrer l'application : `DB_PASSWORD=pass npm start`

## 📋 Fonctionnalités

- **Formulaire HTML** : Saisie de nom et email
- **Validation** : Vérification des champs et format email
- **Base de données** : Stockage en MariaDB
- **API REST** : Endpoints pour soumission et consultation
- **Tests** : Unitaires (Jest) et E2E (Cypress)

## 🧪 Tests

- **Tests unitaires** : `npm run test:unit`
- **Tests E2E** : `npm run test:e2e`
- **Linter** : `npm run lint`

## 🔄 CI/CD

Le pipeline GitHub Actions s'exécute sur :
- Push sur `main`
- Pull Request vers `main`

Étapes du pipeline :
1. Installation des dépendances
2. Exécution du linter
3. Démarrage de MariaDB (Docker)
4. Exécution des fixtures
5. Tests unitaires
6. Tests E2E

## 🗃️ Base de données

- **MariaDB** avec table `submissions`
- **Fixtures** : Données de test automatiques
- **Variables d'environnement** pour la configuration

## 📝 Endpoints

- `GET /` : Formulaire HTML
- `POST /submit` : Soumission de données
- `GET /submissions` : Liste des soumissions (JSON) 