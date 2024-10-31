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
