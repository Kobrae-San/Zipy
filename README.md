# 📁 Zipy

Zipy est une application web de gestion et de partage de fichiers qui permet aux utilisateurs de télécharger, stocker et gérer leurs fichiers.

## ✨ Fonctionnalités

- Upload de fichiers avec interface drag & drop
- Historique des fichiers uploadés
- Téléchargement des fichiers
- Partage d'un lien pour télécharger le fichier
- Gestion des fichiers (suppression, téléchargement)
- Interface utilisateur moderne avec Tailwind CSS et shadcn/ui

## ⚡ Limitations

- Taille maximale par fichier : 2GB
- Quota total par utilisateur : 2GB
- Formats de fichiers : Tous types supportés

## 🚀 Technologies utilisées

### Backend

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- JWT

### Frontend

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vite

### DevOps

- Docker
- Docker Compose

## 📋 Prérequis

- Docker et Docker Compose

## Environnements

- Le Fichier .env doit se trouver à la racine du projet afin de concorder avec le path du fichier env.config dans le dossier server/src/configs.
- Il faut modifier la variable DATABASE_HOST, afin qu'elle est la valeur "localhost" , comme ci dessous:
-

```
DATABASE_HOST="localhost"
DATABASE_USER="root" Le compose utilise ces variables pour la DB
DATABASE_PASSWORD="root" Le compose utilise ces variables pour la DB
DATABASE_NAME="zipy" // Le compose utilise ces variables pour la DB
DATABASE_PORT=5432 //En correspondance avec le compose
SERVER_PORT=3000 //En correspondance avec le compose et le Dockerfile
JWT_EXPIRES_IN="1h"
JWT_SECRET="ceciestunsecretbiengardetresbiengarde"

```

## 🛠 Installation

1. Clonez le repository

```bash
git clone https://github.com/Kobrae-San/Zipy.git
cd Zipy
```

2. Build les images docker

```bash
make build
```

3. Démarrer l'application

```bash
make up
```

L'application sera disponible sur :

- Frontend : http://localhost:4124
- Backend : http://localhost:3000

## 🔧 Commandes disponibles

```bash
make build   # Build les images Docker
make up      # Démarrer l'application
make down    # Arrêter l'application
make restart # Redémarre l'application
make logs    # Voir les logs
```

## 👥 Contributeurs

- [Djédjé Gboble](https://github.com/Kobrae-San)
- [Julien Heitz](https://github.com/heitzjulien)
