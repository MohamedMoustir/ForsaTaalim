# 🎓 ForsaTaalim

<img width="1884" alt="Capture d'écran 2025-05-23 173538" src="https://github.com/user-attachments/assets/47e17a0b-f1ad-4cd8-b562-0f634255939a" />

**ForsaTaalim** est une plateforme innovante qui connecte les étudiants à des tuteurs qualifiés, ainsi que les parents à des enseignants compétents pour leurs enfants. Elle facilite la communication, l'apprentissage et améliore l'accès à l'éducation de qualité.

---

## 📸 Aperçu de la plateforme

<img width="1854" alt="Interface principale" src="https://github.com/user-attachments/assets/58f508e1-0027-49af-83d2-52903d348fd6" />

<img width="967" alt="Profil tuteur" src="https://github.com/user-attachments/assets/8ab565b8-3884-46f1-a8f8-71bbdd53bb61" />

<img width="1919" alt="Tableau de bord" src="https://github.com/user-attachments/assets/d130565e-9f40-4409-9e7f-62a1ecb367d0" />

---

## 🚀 Fonctionnalités principales

### Pour les tuteurs
- 👨‍🏫 **Inscription et gestion de profil** - Créez votre profil professionnel complet
- 📚 **Gestion des matières** - Définissez vos spécialités et niveaux d'enseignement
- 📅 **Planning flexible** - Gérez votre disponibilité et vos réservations

### Pour les étudiants & parents
- 👨‍🎓 **Inscription simplifiée** - Créez un compte en quelques clics
- 🔍 **Recherche avancée** - Trouvez le tuteur idéal selon la matière, la ville et le niveau
- 📅 **Réservation facile** - Réservez vos séances en ligne
- ⭐ **Avis vérifiés** - Consultez les évaluations des autres utilisateurs

### Fonctionnalités communes
- 📨 **Messagerie intégrée** - Communiquez directement avec les tuteurs/étudiants
- 🔔 **Notifications en temps réel** - Restez informé de toutes les activités
- 🔐 **Sécurité renforcée** - Authentification sécurisée avec Laravel Sanctum
- 📊 **Tableau de bord personnalisé** - Suivez vos statistiques et activités

### Administration
- 📊 **Tableau de bord administrateur** - Gérez la plateforme efficacement
- 👥 **Gestion des utilisateurs** - Modération et support utilisateurs
- 📈 **Statistiques détaillées** - Analysez les performances de la plateforme

---

## 🛠️ Technologies utilisées

| Catégorie          | Technologies                                  |
|--------------------|-----------------------------------------------|
| 🧠 **Backend**     | PHP 8.2, Laravel 10, Laravel Sanctum          |
| 🎨 **Frontend**    | React.js, TailwindCSS                         |
| 🗃️ **Base de données** | PostgreSQL                                |
| 🐳 **Environnement** | Laravel Sail, Docker                        |

---

## 📋 Prérequis

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- Docker Desktop (pour Laravel Sail)
- PostgreSQL 15+

---

## ⚙️ Installation

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/votre-username/forsataalim.git
cd forsataalim
```

### 2️⃣ Installation des dépendances backend
```bash
composer install
```

### 3️⃣ Configuration de l'environnement
```bash
cp .env.example .env
php artisan key:generate
```

Configurez votre base de données PostgreSQL dans le fichier `.env` :
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=forsataalim
DB_USERNAME=votre_username
DB_PASSWORD=votre_password
```

### 4️⃣ Migration de la base de données
```bash
php artisan migrate --seed
```

### 5️⃣ Installation des dépendances frontend
```bash
npm install
```

### 6️⃣ Lancer l'application

**Avec Laravel Sail (Docker) :**
```bash
./vendor/bin/sail up -d
```

**Sans Docker :**
```bash
# Terminal 1 - Backend
php artisan serve

# Terminal 2 - Frontend
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

---

## 📁 Structure du projet

```
forsataalim/
├── app/                    # Code backend Laravel
├── resources/
│   ├── js/                 # Code React
│   └── views/              # Vues Blade
├── database/
│   ├── migrations/         # Migrations de la BDD
│   └── seeders/            # Données de test
├── routes/                 # Routes API et Web
├── public/                 # Assets publics
└── tests/                  # Tests automatisés
```

---

## 🧪 Tests

```bash
# Tests backend
php artisan test

# Tests frontend
npm run test
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👥 Auteurs

- **Votre Nom** - *Développeur principal* - [@votre-username](https://github.com/votre-username)

---

## 📞 Contact

Pour toute question ou suggestion :
- 📧 Email : itsmoustir@gmail.com



---

## 🙏 Remerciements

- Merci à tous les contributeurs qui ont participé à ce projet
- Laravel pour son excellent framework
- React pour son écosystème dynamique
- La communauté open source

---

<div align="center">
  <strong>Fait avec ❤️ pour améliorer l'accès à l'éducation</strong>
</div>
