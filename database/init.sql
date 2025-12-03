-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS tp_deploiement_si;
USE tp_deploiement_si;

-- --------------------------------------------------------

-- 1. Table : utilisateurs
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
-- MISE À JOUR : Ajout des colonnes type, min, max
CREATE TABLE IF NOT EXISTS variables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  automate_id INT NOT NULL,
  registre VARCHAR(50) NOT NULL,
  frequence INT DEFAULT 5,
  unite VARCHAR(50),
  
  -- NOUVELLES COLONNES
  type VARCHAR(20) DEFAULT 'coil', -- 'coil' (bit) ou 'holding' (mot)
  min FLOAT DEFAULT NULL,
  max FLOAT DEFAULT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (automate_id) REFERENCES automates(id) ON DELETE CASCADE
);

-- Exemples d'insertion avec les nouveaux champs
INSERT INTO variables (id, nom, automate_id, registre, frequence, unite, type, min, max) VALUES
(1, 'Température', 1, '505', 5, '°C', 'coil', 0, 1), -- Exemple bit (ton ancien exemple)
(2, 'bp-dpcy', 2, '503', 3, 'P', 'coil', 0, 1),
(13, 'tempzone4', 1, '400', 3, '°C', 'holding', 0, 100); -- Exemple mot (température)

-- --------------------------------------------------------

-- 4. Table : mesures
CREATE TABLE IF NOT EXISTS mesures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  variable_id INT NOT NULL,
  valeur FLOAT NOT NULL,
  horodatage DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (variable_id) REFERENCES variables(id) ON DELETE CASCADE
);

CREATE INDEX idx_mesures_variable_horodatage ON mesures(variable_id, horodatage);