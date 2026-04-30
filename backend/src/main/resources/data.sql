-- ============================================
-- E-Store - Données d'initialisation
-- Catégories, Produits et Stock
-- ============================================

USE estore_db;

-- ============================================
-- 1. CATÉGORIES
-- ============================================
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Smartphones', 'Téléphones mobiles dernière génération'),
(2, 'Ordinateurs', 'Laptops, PC fixes et tablettes'),
(3, 'Électroménager', 'Gros électroménager pour la maison'),
(4, 'TV & Audio', 'Téléviseurs, enceintes et casques audio');

-- ============================================
-- 2. PRODUITS - SMARTPHONES (category_id = 1)
-- ============================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
(1, 'iPhone 17', '<strong>Écran :</strong> 6.3" Super Retina XDR OLED 120Hz<br><strong>Stockage :</strong> 256-512 Go<br><strong>RAM :</strong> 8 Go<br><strong>Processeur :</strong> Apple A19<br><strong>Batterie :</strong> 3692 mAh<br><strong>Appareil photo :</strong> 48MP + 48MP', 13999, '/images/smartphones/iphone-17.jpg', 1),
(2, 'iPhone 17 Pro', '<strong>Écran :</strong> 6.3" Super Retina XDR OLED 120Hz<br><strong>Stockage :</strong> 256 Go - 1 To<br><strong>RAM :</strong> 12 Go<br><strong>Processeur :</strong> Apple A19 Pro<br><strong>Batterie :</strong> 3988 mAh<br><strong>Appareil photo :</strong> Triple 48MP + téléphoto', 15499, '/images/smartphones/ip17pro.jpg', 1),
(3, 'iPhone 17 Pro Max', '<strong>Écran :</strong> 6.9" Super Retina XDR OLED 120Hz<br><strong>Stockage :</strong> 256 Go - 1 To<br><strong>RAM :</strong> 12 Go<br><strong>Processeur :</strong> Apple A19 Pro<br><strong>Batterie :</strong> 4832 mAh<br><strong>Appareil photo :</strong> Triple 48MP + zoom 8x', 16990, '/images/smartphones/ip17pro-max.jpg', 1),
(4, 'Samsung Galaxy S26', '<strong>Écran :</strong> 6.2" Dynamic AMOLED 2X 120Hz<br><strong>Stockage :</strong> 256-512 Go<br><strong>RAM :</strong> 12 Go<br><strong>Processeur :</strong> Snapdragon 8 Elite<br><strong>Batterie :</strong> 4500 mAh<br><strong>Appareil photo :</strong> 50MP + 12MP + 10MP', 10999, '/images/smartphones/S26.jpg', 1),
(5, 'Samsung Galaxy S26+', '<strong>Écran :</strong> 6.7" Dynamic AMOLED 2X 120Hz<br><strong>Stockage :</strong> 256-512 Go<br><strong>RAM :</strong> 12 Go<br><strong>Processeur :</strong> Snapdragon 8 Elite<br><strong>Batterie :</strong> 4900 mAh<br><strong>Appareil photo :</strong> 50MP + 12MP + 10MP', 12499, '/images/smartphones/S26+.jpg', 1),
(6, 'Samsung Galaxy S26 Ultra', '<strong>Écran :</strong> 6.9" Dynamic AMOLED 2X 120Hz<br><strong>Stockage :</strong> 256 Go - 1 To<br><strong>RAM :</strong> 12-16 Go<br><strong>Processeur :</strong> Snapdragon 8 Elite<br><strong>Batterie :</strong> 5000 mAh<br><strong>Appareil photo :</strong> 200MP + zoom périscopique', 15999, '/images/smartphones/S26ultra.jpg', 1),
(7, 'Google Pixel 10', '<strong>Écran :</strong> 6.3" OLED 120Hz<br><strong>Stockage :</strong> 128-256 Go<br><strong>RAM :</strong> 12 Go<br><strong>Processeur :</strong> Google Tensor G5<br><strong>Batterie :</strong> 4700 mAh<br><strong>Appareil photo :</strong> 50MP + 12MP', 8999, '/images/smartphones/google_pixel_10.jpg', 1),
(8, 'Google Pixel 10 Pro', '<strong>Écran :</strong> 6.7" LTPO OLED 120Hz<br><strong>Stockage :</strong> 256 Go - 1 To<br><strong>RAM :</strong> 16 Go<br><strong>Processeur :</strong> Google Tensor G5<br><strong>Batterie :</strong> 5050 mAh<br><strong>Appareil photo :</strong> Triple capteur 50MP', 11499, '/images/smartphones/Google_Pixel_10pro.jpg', 1),
(9, 'Xiaomi 17 Pro Max', '<strong>Écran :</strong> 6.8" AMOLED 120Hz<br><strong>Stockage :</strong> 256 Go - 1 To<br><strong>RAM :</strong> 12-16 Go<br><strong>Processeur :</strong> Snapdragon 8 Elite Gen 5<br><strong>Batterie :</strong> 6000+ mAh<br><strong>Appareil photo :</strong> Triple 50MP Leica', 9999, '/images/smartphones/xiaomi_17_pro_max.jpg', 1),
(10, 'Xiaomi Note 15 Pro', '<strong>Écran :</strong> 6.67" AMOLED 120Hz<br><strong>Stockage :</strong> 256-512 Go<br><strong>RAM :</strong> 8-12 Go<br><strong>Processeur :</strong> Snapdragon 7 Gen Series<br><strong>Batterie :</strong> 5100 mAh<br><strong>Appareil photo :</strong> 200MP principal', 4299, '/images/smartphones/xiaomi_note_15_pro.jpg', 1);

-- ============================================
-- 3. PRODUITS - ORDINATEURS (category_id = 2)
-- ============================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
(21, 'MacBook Pro M5 Pro', '<strong>Processeur :</strong> Apple M5 Pro 15-core<br><strong>RAM :</strong> 24 Go<br><strong>Stockage :</strong> 1 To SSD<br><strong>Écran :</strong> 14.2" Liquid Retina XDR 120Hz<br><strong>Carte graphique :</strong> GPU 16-core<br><strong>Batterie :</strong> 72.4 Wh<br><strong>Système :</strong> macOS', 24999, '/images/ordinateurs/macbook_pro_m5_pro.jpg', 2),
(22, 'Dell XPS 15', '<strong>Processeur :</strong> Intel Core Ultra 7<br><strong>RAM :</strong> 16 Go<br><strong>Stockage :</strong> 512 Go SSD<br><strong>Écran :</strong> 15.6" OLED<br><strong>Carte graphique :</strong> NVIDIA RTX 4050<br><strong>Batterie :</strong> 86 Wh<br><strong>Système :</strong> Windows 11', 18999, '/images/ordinateurs/Dell_XPS_15.jpg', 2),
(23, 'Lenovo ThinkPad X1 Carbon', '<strong>Processeur :</strong> Intel Core Ultra 7<br><strong>RAM :</strong> 16 Go<br><strong>Stockage :</strong> 512 Go SSD<br><strong>Écran :</strong> 14" WUXGA OLED<br><strong>Carte graphique :</strong> Intel Iris Xe<br><strong>Batterie :</strong> 57 Wh<br><strong>Système :</strong> Windows 11 Pro', 15999, '/images/ordinateurs/Lenovo_ThinkPad_X1_Carbon.jpg', 2),
(24, 'ASUS ZenBook 14', '<strong>Processeur :</strong> Intel Core Ultra 7<br><strong>RAM :</strong> 16 Go<br><strong>Stockage :</strong> 1 To SSD<br><strong>Écran :</strong> 14" OLED 2.8K<br><strong>Carte graphique :</strong> Intel Arc Graphics<br><strong>Batterie :</strong> 75 Wh<br><strong>Système :</strong> Windows 11', 12999, '/images/ordinateurs/ASUS_ZenBook_14.jpg', 2),
(25, 'Samsung Galaxy Book Ultra', '<strong>Processeur :</strong> Intel Core Ultra 9<br><strong>RAM :</strong> 32 Go<br><strong>Stockage :</strong> 1 To SSD<br><strong>Écran :</strong> 16" AMOLED 3K<br><strong>Carte graphique :</strong> NVIDIA RTX 4070<br><strong>Batterie :</strong> 76 Wh<br><strong>Système :</strong> Windows 11', 22999, '/images/ordinateurs/Samsung_galaxy_book.jpg', 2),
(26, 'ASUS TUF Gaming F15', '<strong>Processeur :</strong> Intel Core i7-13620H<br><strong>RAM :</strong> 16 Go<br><strong>Stockage :</strong> 1 To SSD<br><strong>Écran :</strong> 15.6" FHD 144Hz<br><strong>Carte graphique :</strong> NVIDIA RTX 4060<br><strong>Batterie :</strong> 90 Wh<br><strong>Système :</strong> Windows 11', 14499, '/images/ordinateurs/ASUS_TUF_Gaming_F15.jpg', 2);

-- ============================================
-- 4. PRODUITS - ÉLECTROMÉNAGER (category_id = 3)
-- ============================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
(31, 'Lave-vaisselle LG QuadWash 14 places', '<strong>TrueSteam :</strong> Laisse vos plats vraiment propres, réduit les traces d''eau et les désinfecte.<br><strong>QuadWash :</strong> Bras Multi-Motion pour nettoyer en une seule fois.<br><strong>Auto Open Dry :</strong> S''ouvre automatiquement pour un séchage naturel.<br><strong>Séchage thermique :</strong> Air chaud pour un séchage efficace.', 8790, '/images/electromenager/Lave_vaisselle_lg.jpg', 3),
(32, 'Lave-vaisselle Bosch Encastrable 60cm', '<strong>Nombre de programmes :</strong> 6<br><strong>Système de séchage :</strong> Chaleur propre<br><strong>Options :</strong> Extra dry, demi charge, HygiènePlus<br><strong>HomeConnect :</strong> Oui', 7999, '/images/electromenager/Lave_vaisselle_bosh.jpg', 3),
(33, 'Machine à Laver Bosch WAN282X1ME', '<strong>Classe énergétique :</strong> A<br><strong>Capacité :</strong> 8.0 kg<br><strong>Vitesse essorage :</strong> 1400 rpm<br><strong>EcoSilence Drive :</strong> Moteur silencieux<br><strong>Couleur :</strong> Argent inox', 4999, '/images/electromenager/machine_a_laver.jpg', 3),
(34, 'Aspirateur Bosch BWD420HYG', '<strong>Dimensions :</strong> 360x350x490 mm<br><strong>Poids :</strong> 8.7 kg<br><strong>Rayon d''action :</strong> 12 m', 2999, '/images/electromenager/aspirateur.jpg', 3),
(35, 'Fer à Repasser Sans Fil DENWA DIR-721AB', '<strong>Puissance :</strong> 2200 W<br><strong>Réservoir :</strong> 300 ml<br><strong>Débit vapeur :</strong> 10-20g/min<br><strong>Semelle :</strong> Céramique<br><strong>Autonomie :</strong> Sans fil<br><strong>Couleur :</strong> Noir', 269, '/images/electromenager/fer_a_vapeur.jpg', 3),
(36, 'Grille-pain compact MyMoment Noir', '<strong>Dimensions :</strong> 207x293x175 mm<br><strong>Couleur :</strong> Noir<br><strong>Matériau :</strong> Plastique<br><strong>Nombre de fentes :</strong> 2<br><strong>Réglage :</strong> Bouton rotatif continu<br><strong>Support petits pains :</strong> Oui', 649, '/images/electromenager/grille_pain.jpg', 3);

-- ============================================
-- 5. PRODUITS - TV & AUDIO (category_id = 4)
-- ============================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
(41, 'Redragon H231 Scream Gaming Headset', '<strong>Type :</strong> Stéréo<br><strong>Connexion :</strong> Filaire<br><strong>Couplage :</strong> Circum-aural<br><strong>Garantie :</strong> 12 mois', 149, '/images/tv-audio/redragon_h231.jpg', 4),
(42, 'TV Samsung Crystal UHD U8000F 43"', '<strong>Processeur :</strong> Crystal 4K<br><strong>Qualité :</strong> Résolution 4K réaliste<br><strong>Design :</strong> MetalStream<br><strong>Interface :</strong> One UI Tizen<br><strong>Sécurité :</strong> Samsung Knox', 3690, '/images/tv-audio/tv_samsung_u8000f.jpg', 4),
(43, 'Smart TV LG UHD AI UA73 50"', '<strong>Qualité :</strong> 4K HDR10 Pro<br><strong>Processeur :</strong> alpha 7 4K AI (8ème génération)<br><strong>Télécommande :</strong> AI Magic Remote<br><strong>Amélioration :</strong> Upscaling 4K supérieur', 4429, '/images/tv-audio/tv_lg_ua73.jpg', 4),
(44, 'Enceinte portable JBL Charge 6', '<strong>Bluetooth :</strong> 5.4<br><strong>Puissance :</strong> 45 Watts RMS<br><strong>Autonomie :</strong> 24h + 4h<br><strong>Résistance :</strong> IP68 (eau et poussière)<br><strong>Fonction :</strong> Powerbank', 1449, '/images/tv-audio/jbl_charge_6.jpg', 4);

-- ============================================
-- 6. STOCK (INVENTORY)
-- ============================================
INSERT IGNORE INTO inventory (id, product_id, quantity) VALUES
(1, 1, 15), (2, 2, 12), (3, 3, 10), (4, 4, 20),
(5, 5, 18), (6, 6, 8), (7, 7, 15), (8, 8, 12),
(9, 9, 10), (10, 10, 25),
(21, 21, 10), (22, 22, 15), (23, 23, 12), (24, 24, 18),
(25, 25, 8), (26, 26, 20),
(31, 31, 8), (32, 32, 10), (33, 33, 12), (34, 34, 15),
(35, 35, 20), (36, 36, 18),
(41, 41, 25), (42, 42, 10), (43, 43, 8), (44, 44, 15);

-- ============================================
-- FIN
-- ============================================