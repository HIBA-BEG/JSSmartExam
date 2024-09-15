# 🎓 Plateforme de Gestion des Tests - Node.js & Express.js

## 📋 Description du projet

Cette application web permet aux formateurs de proposer et gérer des tests/examens pour les étudiants. Elle intègre la création de questions, la gestion des réponses, et l'évaluation des résultats des étudiants. L'application suit le modèle MVC (Modèle-Vue-Contrôleur) pour une meilleure organisation et gestion du code.

### ✨ Fonctionnalités principales

- Un formateur peut programmer des tests pour différents sujets et niveaux.
- Les étudiants peuvent passer un test plusieurs fois après avoir soumis une demande avec une raison spécifique.
- Les réponses des étudiants sont enregistrées et évaluées avec un score pour chaque question.
- Les formateurs peuvent définir les conditions du test : score de réussite, nombre de chances, droit de voir les réponses, etc.
- L'application prend en charge plusieurs types de questions : à choix unique, à choix multiple, avec des médias associés (images, vidéos, etc.).

## 🚀 Technologies utilisées

- **Backend** : Node.js, Express.js
- **Base de données** : MySQL
- **Docker** : Pour faciliter le déploiement et assurer la cohérence entre les environnements.
- **Frontend** : EJS (Embedded JavaScript) pour les vues.

## 🛠️ Installation et configuration

### 1. Prérequis

- Node.js (20.17.0(LTS))
- Docker
- MySQL (ou une instance Docker de MySQL)

### 2. Installation du projet

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/HIBA-BEG/JSSmartExam.git
   cd votre-projet
2.Installez les dépendances :
npm install
3.Créez un fichier .env à la racine du projet avec les variables suivantes:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestion_tests
PORT=3000
4.Lancer l'application:
4-1Lancez l'application en mode développement :
npm run dev
4-2Ou utilisez Docker pour un déploiement facile :
docker-compose up --build

