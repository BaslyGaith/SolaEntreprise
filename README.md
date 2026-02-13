# Site Web Entreprise Sola

Ce projet est le site vitrine pour l'entreprise de couverture "Entreprise Sola". Il est construit avec **Next.js** et optimisé pour un hébergement mutualisé standard (LWS) grâce à un export statique et un backend PHP pour le formulaire de contact.

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (Version 18 ou supérieure recommandée)
- npm (généralement inclus avec Node.js)

## 🛠️ Installation et Lancement Local

Pour travailler sur le projet en local sur votre ordinateur :

1.  **Cloner le projet** (si ce n'est pas déjà fait) :
    ```bash
    git clone https://github.com/BaslyGaith/SolaEntreprise.git
    cd SolaEntreprise
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```
    Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📦 Construction pour la Production (LWS)

Ce projet est configuré pour générer un site statique (HTML/CSS/JS) compatible avec n'importe quel hébergement (LWS "Perso", etc.).

1.  **Générer le site** :
    ```bash
    npm run build
    ```
    Cette commande va créer un dossier nommé `out/` à la racine du projet.

    > **Note :** La configuration `output: 'export'` est déjà active dans `next.config.mjs`.

## 🌍 Déploiement sur LWS

Une fois le dossier `out/` généré :

1.  Ouvrez votre client FTP (FileZilla).
2.  Connectez-vous à votre hébergement LWS (`entreprise-sola.fr`).
3.  Allez dans le dossier `public_html` (ou `www`).
4.  **Supprimez** le fichier `index.php` par défaut s'il existe.
5.  **Transférez TOUT le contenu** du dossier `out/` (fichiers et dossiers) vers le dossier `public_html` du serveur.

### 📧 Formulaire de Contact

Le formulaire de contact utilise un script PHP (`public/send-email.php`) pour l'envoi d'emails, car LWS supporte nativement PHP.
Ce fichier est automatiquement inclus dans le dossier `out/` lors du build et sera transféré avec le reste du site.

Assurez-vous que l'adresse email de réception dans `public/send-email.php` est correcte avant de déployer.
