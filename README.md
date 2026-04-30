## ✅ **Contenu du fichier `README.md` (à la racine `e-store/`)**

```markdown
# ElectroWorld - Application E-commerce

## Technologies
- **Backend**: Spring Boot, Spring Data JPA, MongoDB, MySQL
- **Frontend**: React + Vite

## Installation

### Backend
1. Ouvrir le projet dans IntelliJ IDEA
2. Configurer MySQL et MongoDB dans `application.properties`
3. Lancer `BackendApplication.java`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Utilisateur | test@example.com |  |
| Administrateur | admin@example.com |  |

## Fonctionnalités
- Catalogue de produits (4 catégories, 26 produits)
- Recherche dynamique
- Panier (ajout, modification, suppression)
- Commandes
- Avis produits (MongoDB)
- Interface admin (gestion produits et stock)

## API Principales

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Inscription |
| POST | /api/auth/login | Connexion |
| GET | /api/products | Liste produits |
| GET | /api/cart/{userId} | Voir panier |
| POST | /api/orders/{userId} | Valider commande |
| POST | /api/reviews | Ajouter avis |

## Auteurs
zakaria guarnaoui && adnane msillane
```

---
