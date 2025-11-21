-- Test Data for PGSR Application

-- Insert test users (password for all: testpass123)
INSERT INTO user (username, email, password, role) VALUES 
('admin', 'admin@pgsr.com', '$2a$10$r2cSey3Lbf6GBnQk1LxSS.pd8WgguGKJizvEUupJPzKyYf5y/zdC.', 'admin'),
('tech1', 'tech1@pgsr.com', '$2a$10$r2cSey3Lbf6GBnQk1LxSS.pd8WgguGKJizvEUupJPzKyYf5y/zdC.', 'technician'),
('tech2', 'tech2@pgsr.com', '$2a$10$r2cSey3Lbf6GBnQk1LxSS.pd8WgguGKJizvEUupJPzKyYf5y/zdC.', 'technician');

-- Insert test devices
INSERT INTO device (name, model, serial_number) VALUES 
('iPhone 13 Pro', 'A2483', 'SN123456789'),
('Samsung Galaxy S21', 'SM-G991B', 'SN987654321'),
('MacBook Pro 14', 'MBP14-2021', 'SN456789123'),
('iPad Air', 'A2316', 'SN789123456'),
('Dell XPS 15', 'XPS-9520', 'SN321654987'),
('HP Pavilion', 'HP-15-DY', 'SN654321789'),
('Sony Xperia', 'XZ3', 'SN147258369'),
('Lenovo ThinkPad', 'T14-G2', 'SN963852741');

-- Insert test tickets
INSERT INTO ticket (status, description, device_id, user_id) VALUES 
('En cours', 'Client a fait tomber le téléphone, écran totalement cassé', 1, 2),
('Nouveau', 'Téléphone ne charge plus, vérifier port et batterie', 2, 1),
('Terminé', 'Tester le nouveau clavier après remplacement', 3, 3),
('En cours', 'Bouton home ne répond plus aux pressions', 4, 2),
('Nouveau', 'Vérifier carte graphique et RAM', 5, 1),
('Terminé', 'Nettoyer et remplacer ventilateur si nécessaire', 6, 3),
('En cours', 'Micro ne fonctionne pas pendant les appels', 7, 2),
('Nouveau', 'Port USB-C ne fonctionne plus', 8, 1);

-- Insert test workflows
INSERT INTO workflow (status, comments, ticketId) VALUES 
('Terminé', 'Diagnostic initial - Vérification complète', 1),
('Terminé', 'Commande pièce - Commander écran de remplacement', 1),
('En cours', 'Remplacement écran - Installer nouvel écran', 1),
('En attente', 'Test qualité - Tester tactile et affichage', 1),
('En cours', 'Test port charge - Vérifier port USB-C', 2),
('En attente', 'Test batterie - Diagnostic état batterie', 2),
('En cours', 'Diagnostic bouton - Tester mécanisme bouton', 4),
('En attente', 'Remplacement composant - Remplacer module bouton', 4),
('En cours', 'Test micro - Vérifier micro dans différentes apps', 7);
