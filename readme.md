# Je Me Digitalise - Refonte du Site Web

Refonte complète du site web avec React, SCSS et toutes les fonctionnalités modernes.

## 🚀 Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Animations fluides avec Framer Motion
- ✅ Calendrier de réservation interactif
- ✅ Système d'envoi d'email natif (mailto:)
- ✅ Navigation React Router
- ✅ Styles SCSS modulaires
- ✅ Performance optimisée

## 📦 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Système d'envoi d'email

Le site utilise le protocole `mailto:` natif, comme en Java. Aucune configuration supplémentaire n'est nécessaire !

**Comment ça fonctionne :**
- Quand l'utilisateur remplit le formulaire et clique sur "Envoyer"
- Le client email par défaut s'ouvre automatiquement (Outlook, Gmail, etc.)
- L'email est pré-rempli avec toutes les informations du formulaire
- L'utilisateur n'a plus qu'à cliquer sur "Envoyer" dans son client email
- L'email est envoyé directement à `jules_benoit@outlook.com`

**Avantages :**
- ✅ Aucune configuration nécessaire
- ✅ Pas de service tiers
- ✅ Fonctionne partout
- ✅ 100% gratuit
- ✅ Fiable et sécurisé

### 3. Lancer le projet

```bash
# Mode développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure du projet

```
jemedigitalise-refonte/
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── SocialMedia.jsx
│   │   ├── Certifications.jsx
│   │   ├── Stats.jsx
│   │   └── Portfolio.jsx
│   ├── pages/             # Pages principales
│   │   ├── Home.jsx
│   │   └── Contact.jsx
│   ├── styles/            # Styles SCSS
│   │   ├── _variables.scss
│   │   ├── _base.scss
│   │   ├── _utilities.scss
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.scss
│   ├── App.jsx
│   └── main.jsx
├── public/                # Assets publics
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Personnalisation

### Couleurs

Modifiez les couleurs dans `src/styles/_variables.scss` :

```scss
$color-primary: #1a1a2e;
$color-highlight: #e94560;
// etc.
```

### Horaires

Les horaires de disponibilité sont définis dans `src/pages/Contact.jsx` :

```javascript
const weekdayTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
const weekendTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
```

### Contenu

- Services : `src/components/Services.jsx`
- Certifications : `src/components/Certifications.jsx`
- Stats : `src/components/Stats.jsx`
- Portfolio : `src/components/Portfolio.jsx`

## 📧 Configuration Email

L'email de destination est configuré dans `Contact.jsx` :

```javascript
to_email: 'jules_benoit@outlook.com'
```

## 🔧 Technologies utilisées

- **React 18** - Framework UI
- **React Router** - Navigation
- **Framer Motion** - Animations
- **SCSS** - Styles
- **Vite** - Build tool
- **React DatePicker** - Sélection de dates
- **Mailto:** - Système d'envoi d'emails natif

## 📱 Responsive

Le site est entièrement responsive avec des breakpoints :
- Mobile : < 576px
- Tablet : < 768px
- Desktop : < 1024px
- Wide : < 1400px

## 🎯 SEO

- Meta tags configurés
- Structure sémantique HTML
- Performance optimisée
- Images optimisées

## 🚀 Déploiement

### Netlify / Vercel

1. Connectez votre repository
2. Configurez :
   - Build command : `npm run build`
   - Output directory : `dist`

### Build manuel

```bash
npm run build
# Les fichiers sont dans /dist
```

## 📝 Notes importantes

1. **Système d'email natif** : Le formulaire utilise mailto: qui ouvre le client email par défaut
2. **Images** : Ajoutez vos vraies images dans `/public` et mettez à jour les chemins
3. **Vidéos** : Remplacez les placeholders vidéo par vos vraies vidéos

## 🆘 Support

Pour toute question :
- Email : jules_benoit@outlook.com
- Tel : +32 499 84 56 36

## 📄 Licence

Tous droits réservés © 2025 Je Me Digitalise