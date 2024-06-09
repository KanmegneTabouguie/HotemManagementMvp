### README pour le Backend de Gestion Hôtelière

## Table des Matières
1. [Introduction](#introduction)
2. [Fonctionnalités](#fonctionnalités)
3. [Commencer](#commencer)
    - [Prérequis](#prérequis)
    - [Installation](#installation)
    - [Exécution de l'Application](#exécution-de-lapplication)
4. [Variables d'Environnement](#variables-denvironnement)
5. [Points de Terminaison de l'API](#points-de-terminaison-de-lapi)
    - [Authentification](#authentification)
    - [Chambres](#chambres)
    - [Utilisateurs](#utilisateurs)
6. [Middleware](#middleware)
7. [Services](#services)
8. [Modèles](#modèles)
9. [Contribution](#contribution)

## Introduction
Ce projet est un système backend pour une application de gestion hôtelière, implémenté en utilisant Node.js et Express.js. Il fournit des points de terminaison d'API RESTful pour gérer les chambres d'hôtel, les utilisateurs et l'authentification.

## Fonctionnalités
- Authentification et autorisation des utilisateurs
- Gestion des chambres (opérations CRUD)
- Gestion des utilisateurs (opérations CRUD)
- Authentification basée sur JWT
- Contrôle d'accès basé sur les rôles
- Mise en cache avec memory-cache

## Commencer

### Prérequis
- Node.js (version 12 ou supérieure)
- npm (version 6 ou supérieure)
- Base de données MySQL

### Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/KanmegneTabouguie/HotemManagementMvp.git
   cd backend
   cd frontend(use live server to access the frontend section after run of the backend)
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement (voir [Variables d'Environnement](#variables-denvironnement)).

4. Configurer la base de données et la connexion (voir [config/database.js](config/database.js)).

### Exécution de l'Application
1. Démarrer le serveur :
   ```bash
   npm start
   ```

2. Le serveur fonctionnera sur le port spécifié dans les variables d'environnement ou par défaut sur `3068`.

## Variables d'Environnement
Créer un fichier `.env` à la racine du répertoire et ajouter les variables suivantes :

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
PORT=your_port_number
```

## Points de Terminaison de l'API

### Authentification
- `POST /auth/signup`: Inscrire un nouvel utilisateur
- `POST /auth/login`: Connecter un utilisateur et obtenir un JWT
- `POST /auth/logout`: Déconnecter un utilisateur (invalider le token)

### Chambres
- `GET /rooms`: Lister toutes les chambres disponibles (accessible aux invités et aux administrateurs)
- `GET /rooms/:id`: Obtenir les détails d'une chambre par ID (accessible aux invités et aux administrateurs)
- `POST /rooms`: Créer une nouvelle chambre (réservé aux administrateurs)
- `PUT /rooms/:id`: Mettre à jour une chambre (réservé aux administrateurs)
- `PATCH /rooms/:id`: Mettre à jour partiellement une chambre (réservé aux administrateurs)
- `DELETE /rooms/:id`: Supprimer une chambre (réservé aux administrateurs)

### Utilisateurs
- `POST /users`: Créer un nouvel utilisateur (réservé aux administrateurs)
- `PUT /users/:id`: Mettre à jour un utilisateur (réservé aux administrateurs)
- `DELETE /users/:id`: Supprimer un utilisateur (réservé aux administrateurs)
- `GET /users/:id`: Obtenir les détails d'un utilisateur par ID (réservé aux administrateurs)
- `GET /users`: Obtenir tous les utilisateurs (réservé aux administrateurs)

## Middleware
- `authMiddleware`: Vérifie si l'utilisateur est authentifié et définit le rôle de l'utilisateur
- `adminMiddleware`: Restreint l'accès aux routes réservées aux administrateurs
- `cacheMiddleware(duration)`: Met en cache les réponses pendant une durée spécifiée

## Services
- `authService`: Gère l'inscription des utilisateurs, la connexion et le hachage des mots de passe
- `roomService`: Gère les opérations CRUD pour les chambres
- `userService`: Gère les opérations CRUD pour les utilisateurs

## Modèles
- `Room`: Définit les méthodes pour interagir avec la table des chambres dans la base de données
- `User`: Définit les méthodes pour interagir avec la table des utilisateurs dans la base de données

## Contribution
Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request.

