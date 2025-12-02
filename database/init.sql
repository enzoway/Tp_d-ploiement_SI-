-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS tp_deploiement_si;
USE tp_deploiement_si;

-- --------------------------------------------------------

-- 1. Table : utilisateurs
-- Basé sur ton image (Admin/enzo, Opérateur/lucas)
CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO utilisateurs (id, nom, email, mot_de_passe) VALUES
(1, 'Admin', 'enzo', 'root'),
(2, 'Opérateur', 'lucas', 'root');

-- --------------------------------------------------------

-- 2. Table : automates
-- Basé sur ton image (Automate 1, 2 et 5)
CREATE TABLE IF NOT EXISTS automates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  adresse_ip VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO automates (id, nom, adresse_ip) VALUES
(1, 'Automate 1', '172.16.1.24'),
(2, 'automate 2', '172.16.1.21'),
(5, 'automate5', '172.16.1.25');

-- --------------------------------------------------------

-- 3. Table : variables
-- Inclut les colonnes min, max, unite ajoutées récemment
CREATE TABLE IF NOT EXISTS variables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  automate_id INT NOT NULL,
  registre VARCHAR(50) NOT NULL,
  frequence INT DEFAULT 5,
  unite VARCHAR(50),
  min FLOAT DEFAULT NULL,
  max FLOAT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (automate_id) REFERENCES automates(id) ON DELETE CASCADE
);

INSERT INTO variables (id, nom, automate_id, registre, frequence, unite, min, max) VALUES
(1, 'Température', 1, '505', 5, '°C', 0, 1),
(2, 'bp-dpcy', 2, '503', 3, 'P', 0, 1),
(3, 'bp-arcy', 2, '504', 3, 'kk', 0, 1),
(11, 'bp_tl5', 5, '505', 1, 'scal', 0, 1);

-- --------------------------------------------------------

-- 4. Table : mesures
-- Stocke l'historique. On ne met pas de données par défaut ici, 
-- le script Node.js (Poller) va remplir ça très vite.
CREATE TABLE IF NOT EXISTS mesures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  variable_id INT NOT NULL,
  valeur FLOAT NOT NULL,
  horodatage DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (variable_id) REFERENCES variables(id) ON DELETE CASCADE
);

-- Index pour accélérer l'affichage des graphiques (Important pour les requêtes ORDER BY horodatage)
CREATE INDEX idx_mesures_variable_horodatage ON mesures(variable_id, horodatage);