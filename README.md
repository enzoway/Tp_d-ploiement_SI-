# 🏭 Supervision Automates - Interface Opérateur

> **Projet de supervision industrielle open source (SCADA léger)**
> Développé dans le cadre d'un Hackathon industriel.

Ce projet fournit une interface web moderne (Dark Mode) pour la surveillance en temps réel et la configuration d'automates industriels (PLC). Il est conçu pour être léger, rapide et ne dépend d'aucune librairie tierce lourde (Vanilla JS & CSS).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Stable-success)

## 📋 Fonctionnalités

L'application est divisée en deux interfaces distinctes accessibles via un portail de connexion unique :

### 1. 👁️ Mode Surveillance (Opérateur)
* **Tableau de bord temps réel :** Visualisation immédiate du nombre d'automates et des dernières valeurs reçues.
* **Graphiques dynamiques :** Visualisation des courbes de tendance (SVG natif) pour chaque variable surveillée (ex: Température, Pression).
* **Flux de données :** Tableau des dernières mesures reçues avec horodatage.
* **Historique :** Consultation des 50 dernières mesures.

### 2. ⚙️ Mode Modification (Admin / Régleur)
* **Gestion des Automates :** Ajouter (`Nom`, `IP`) ou supprimer des automates du parc.
* **Configuration des Variables :**
    * Définition des registres cibles.
    * Réglage de la fréquence de polling (1s, 3s, 5s, 10s).
    * Définition des seuils Min/Max pour l'échelle des graphiques.
* **Export de données :** Fonctionnalité d'export complet de l'historique au format **CSV**.
* **Administration :** Suppression rapide d'automates ou de variables.

---

## 🛠️ Stack Technique

Le projet est conçu pour être "Drop-in" (facile à déployer) sans étape de build complexe.

* **Frontend :** HTML5, CSS3 (Flexbox/Grid, Responsive), JavaScript (ES6+).
* **Design :** UI "Dark Glassmorphism" moderne, responsive mobile/desktop.
* **Graphiques :** Moteur de rendu SVG personnalisé (aucune librairie type Chart.js n'est utilisée pour maximiser la légèreté).
* **Communication :** API REST (`fetch`, `async/await`).

---

## 🚀 Installation et Démarrage

### Prérequis
Pour que l'interface fonctionne, elle doit se connecter à une API Backend écoutant sur le port **3002**.

### 1. Cloner le projet
```bash
git clone [https://github.com/votre-username/supervision-automates.git](https://github.com/votre-username/supervision-automates.git)
cd supervision-automates
