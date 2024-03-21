
INSERT INTO "type_unite_douaniere" ("code_type_unite_douaniere", "libelle_type_unite_douaniere") VALUES
('BUR',	'BUREAU CENTRAL'),
('BRI',	'BRIGADE MOBILE');


INSERT INTO "unite_douaniere" ("code_unite_douaniere", "effectif_unite_douaniere", "nom_unite_douaniere", "nombre_arme", "nombre_automobile", "nombre_materiel", "code_type_unite_douaniere") VALUES
('06K',	10,	'BUREAU DE LA LOGISTIQUE ET DE LA MAINTENANCE',	3,	5,	20,	'BUR'),
('06Z',	10,	'BUREAU DE LA PROGRAMMATION ET DES FINANCES',	3,	5,	20,	'BUR');


INSERT INTO "sections" ("code_section", "libelle_section", "code_unite_douaniere") VALUES
('SA',  'SECTION ARMEMENT', '06K'),
('SG',  'SECTION GARAGE',   '06K'),
('SM',  'SECTION MATERIEL', '06K');



INSERT INTO "agent" ("matricule_agent", "email_agent", "nom_agent", "code_agent", "numero_telephone_agent", "prenom_agent", "code_section", "code_unite_douaniere") VALUES
('613693H', 'IBRAHIMA@ESP.SN',  'SECK', 'D3485',    773456789,  'IBRAHIMA DIAGNE',  'SG',   '06K'),
('506234B', 'OUMOU@ESP.SN',  'DIALLO',   'D2273',    777654321,  'OUMOU HAWA',   'SG',   '06K'),
('622545C', 'ADMIN1@ESP.SN', 'ADMIN1',    'D281T',    675555555,  'ADMINISTRATEUR1',   'SG',   '06K'),
('622549D', 'ADMIN2@ESP.SN', 'ADMIN2',    'D281B',    975555555,  'ADMINISTRATEUR2',   'SG',   '06K'),
('622543E', 'ADMIN3@ESP.SN', 'ADMIN3',    'D281A',    175555555,  'ADMINISTRATEUR3',   'SG',   '06K');



INSERT INTO "prestataires" ("ninea", "adresse", "adresse_email", "numero_telephone", "raison_sociale") VALUES
('005177614',   'ADDRESS 1',    'EMAIL1@EXAMPLE.COM',   123456789,  'CABINET ALPHA DE CONSULTANCE ET DE GENIE-CIVIL-SARL'),
('005174222',   'ADDRESS 2',    'EMAIL2@EXAMPLE.COM',   987654321,  'TRANSFERT DES TECHNOLOGIES-SARL'),
('005192373',   'ADDRESS 3',    'EMAIL3@EXAMPLE.COM',   555555555,  'ENTREPRISE SENEGALAISE DE PREFABRICATION-SARL');



INSERT INTO "bordereau_livraison" ("identifiant_b_l", "conformite_b_l", "date_b_l", "date_enregistrement", "description_b_l", "lieu_de_livraison", "numero_b_l", "representant_prestataire", "code_section", "matricule_agent", "ninea") VALUES
('BLSA202312011043210', 'OUI',  '2023-12-01',   '2024-03-04 12:18:29.967049',   'DESCRIPTION BL 1', 'LIEU 1',   '001',  'LIVREUR 1',    'SA',   '613693H',  '005177614'),
('BLSM202312021143211', 'OUI',  '2023-12-02',   '2024-03-04 12:18:29.967049',   'DESCRIPTION BL 2', 'LIEU 2',   '002',  'LIVREUR 2',    'SM',   '506234B',  '005174222'),
('BLSG202312031243213', 'NON',  '2023-12-03',   '2024-03-04 12:18:29.967049',   'DESCRIPTION BL 3', 'LIEU 3',   '003',  'LIVREUR 3',    'SG',   '622543E',  '005192373');





INSERT INTO "bon_entree" ("identifiant_b_e", "date_bon_entree", "libelle_bon_entree", "numero_b_e", "observation_bon_entree", "identifiant_b_l") VALUES
('BESA202312011043210', '2023-12-01',   'LIBELLE BE 1', '001',  'OBSERVATION 1',    'BLSA202312011043210'),
('BESM202312021143211', '2023-12-02',   'LIBELLE BE 2', '002',  'OBSERVATION 2',    'BLSM202312021143211'),
('BESG202312031243213', '2023-12-03',   'LIBELLE BE 3', '003',  'OBSERVATION 3',    'BLSG202312031243213');





INSERT INTO "lieu_stockage_vehicule" ("code_lieu_vh", "libellle_lieu_vh", "nombre_limite_stockage_vh") VALUES
('PKN',	'pikine',	50),
('CLB',	'colobane',	100),
('LB6',	'liberté 6',	200),
('HGY',	'hlm grand yoff',	40);




INSERT INTO "type_objet" ("code_type_objet", "libelle_type_objet", "code_section") VALUES
('ARMES',   'ARMES ET MUNITIONS',   'SA'),
('VEHIC',   'VEHICULES ET MATERIELS ROULANTS',  'SG'),
('MATER',   'MATERIELS',    'SM');



INSERT INTO "article_bon_entree" ("code_article_bon_entree", "date_enregistrement", "libelle_article_bon_entree", "quantite_entree", "identifiant_b_e", "code_lieu_vh", "code_type_objet", "matricule_agent") VALUES
(1, '2024-03-04 12:37:34.514509',   'TOYOTA-CAMRY-123456',  1,  'BESA202312011043210',  'PKN',  'ARMES',    '613693H'),
(1, '2024-03-04 12:37:34.51451',    'FORD-MUSTANG-789012',  1,  'BESM202312021143211',  'CLB',  'VEHIC',    '506234B'),
(2, '2024-03-04 12:37:34.514511',   'FORD-ESCAPE-789013',   1,  'BESM202312021143211',  'LB6',  'VEHIC',    '506234B'),
(1, '2024-03-04 12:37:34.514513',   'BMW-X5-345678',    1,  'BESG202312031243213',  'HGY',  'VEHIC',    '622543E');




INSERT INTO bon_pour (identifiant_bon_pour, description_bon_pour, numero_courriel_origine, date_courriel_origine, etat_bon_pour, object_courriel_origine, numero_arrive_d_l_f, date_arrive_d_l_f, observation_d_l_f, numero_arrive_b_l_m, date_arrive_b_l_m, observation_b_l_m, numero_arrive_section, date_arrive_section, observation_section, code_unite_douaniere, code_section, date_enregistrement, matricule_agent) 
VALUES 
    ('BPSG202311121243214', 'DESCRIPTION 1', 123, '2024-01-24', 'INITIAL', 'OBJET 1', 456, '2024-01-25', 'OBSERVATION 1', 789, '2024-01-26', 'OBSERVATION 1', 101, '2024-01-27', 'OBSERVATION 1', '06Z', 'SG', CURRENT_TIMESTAMP, '613693H'),
    ('BPSG202311121243215', 'DESCRIPTION 2', 124, '2024-01-25', 'INITIAL', 'OBJET 2', 457, '2024-01-26', 'OBSERVATION 1', 790, '2024-01-27', 'OBSERVATION 1', 102, '2024-01-28', 'OBSERVATION 1', '06Z', 'SG', CURRENT_TIMESTAMP, '506234B'),
    ('BPSG202311121243216', 'DESCRIPTION 3', 125, '2024-01-26', 'INITIAL', 'OBJET 3', 458, '2024-01-27', 'OBSERVATION 1', 791, '2024-01-28', 'OBSERVATION 1', 103, '2024-01-29', 'OBSERVATION 1', '06K', 'SG', CURRENT_TIMESTAMP, '622543E');


INSERT INTO article_bon_pour (identifiant_bon_pour, code_article_bon_pour, libelle_article_bon_pour, quantite_demandee, code_type_objet, matricule_agent) 
VALUES 
    ('BPSG202311121243214', 1, 'LIBELLE ARTICLE 1', 10, 'VEHIC', '613693H'),
    ('BPSG202311121243215', 1, 'LIBELLE ARTICLE 1', 20, 'VEHIC', '506234B'),
    ('BPSG202311121243216', 1, 'LIBELLE ARTICLE 1', 30, 'VEHIC', '622543E');



INSERT INTO "bon_sortie" ("identifiant_bon_sorie", "date_bon_sortie", "description_bon_sortie", "numero_bon_sortie", "identifiant_bon_pour", "matricule_agent") 
VALUES
('BSSG202311121243214', '2024-01-24',   'Description BS1',  'BS001',    'BPSG202311121243214',  '613693H'),
('BSSG202311121243215', '2024-01-25',   'Description BS2',  'BS002',    'BPSG202311121243215',  '506234B'),
('BSSG202311121243216', '2024-01-26',   'Description BS3',  'BS003',    'BPSG202311121243216',  '622543E');



INSERT INTO article_bon_sortie (identifiant_bon_sortie, code_article_bon_sortie, libelle_article_bon_sortie, quantite_accordee, date_article_bon_sortie, matricule_agent) 
VALUES 
    ('BSSG202311121243214', 1, 'Article BS1', 5, '2024-01-24', '613693H'),
    ('BSSG202311121243215', 1, 'Article BS2', 10, '2024-01-25', '506234B'),
    ('BSSG202311121243216', 1, 'Article BS3', 15, '2024-01-26', '622543E');



INSERT INTO "fonctions" ("code_fonction", "libelle_fonction")
VALUES ('ADMIN', 'ADMINISTRATEUR'), ('CSA', 'CHEF SECTION ARMEMENT'), ('ASA', 'AGENT SECTION ARMEMENT'),
       ('CSG', 'CHEF SECTION GARAGE'), ('ASG', 'AGENT SECTION GARAGE'), ('CSM', 'CHEF SECTION MATÉRIEL'),
       ('ASM', 'AGENT SECTION MATÉRIEL'), ('BLM', 'CHEF BLM'), ('DLF', 'DIRECTEUR DLF');


INSERT INTO "marque_arme" ("code_marque_arme", "libelle_marque_arme") VALUES
('1',   'LIBELLE MARQUE ARME 1');

INSERT INTO "type_arme" ("code_type_arme", "libelle_type_arme") VALUES
('ARME1',   'LIBELLE TYPE ARME 1');


INSERT INTO marque_vehicule (code_marque_vh, libelle_marque_vh)
VALUES 
    ('ALF', 'ALFA ROMEO'),
    ('AST', 'ASTON MARTIN'),
    ('AUD', 'AUDI'),
    ('BEN', 'BENTLEY'),
    ('BMW', 'BMW'),
    ('CAD', 'CADILLAC'),
    ('CHE', 'CHEVROLET'),
    ('CIT', 'CITROËN'),
    ('FIAT', 'FIAT'),
    ('FOR', 'FORD'),
    ('HON', 'HONDA'),
    ('HYU', 'HYUNDAI'),
    ('JAG', 'JAGUAR'),
    ('JEE', 'JEEP'),
    ('KIA', 'KIA'),
    ('LAN', 'LAND ROVER'),
    ('LEX', 'LEXUS'),
    ('MAS', 'MASERATI'),
    ('MAZ', 'MAZDA'),
    ('MCL', 'MCLAREN'),
    ('MER', 'MERCEDES'),
    ('MIN', 'MINI'),
    ('NISS', 'NISSAN'),
    ('OPE', 'OPEL'),
    ('POR', 'PORSCHE'),
    ('REN', 'RENAULT'),
    ('ROL', 'ROLLS-ROYCE'),
    ('SSA', 'SSANGYONG'),
    ('SUB', 'SUBARU'),
    ('TES', 'TESLA'),
    ('TOY', 'TOYOTA'),
    ('VOL', 'VOLKSWAGEN'),
    ('VOLV', 'VOLVO');



INSERT INTO pays (code_pays, libelle_pays)
VALUES 
('AF', 'AFGHANISTAN'),
('ZA', 'AFRIQUE DU SUD'),
('AX', 'ÅLAND, ÎLES'),
('AL', 'ALBANIE'),
('DZ', 'ALGÉRIE'),
('DE', 'ALLEMAGNE'),
('DD', 'ALLEMAGNE DE L''EST'),
('AD', 'ANDORRE'),
('AO', 'ANGOLA'),
('AI', 'ANGUILLA'),
('AQ', 'ANTARCTIQUE'),
('AG', 'ANTIGUA ET BARBUDA'),
('AN', 'ANTILLES NÉERLANDAISES'),
('SA', 'ARABIE SAOUDITE'),
('AR', 'ARGENTINE'),
('AM', 'ARMÉNIE'),
('AW', 'ARUBA'),
('AU', 'AUSTRALIE'),
('AT', 'AUTRICHE'),
('AZ', 'AZERBAÏDJAN'),
('BS', 'BAHAMAS'),
('BH', 'BAHREIN'),
('BD', 'BANGLADESH'),
('BB', 'BARBADE'),
('BY', 'BÉLARUS'),
('BE', 'BELGIQUE'),
('BZ', 'BÉLIZE'),
('BJ', 'BÉNIN'),
('BM', 'BERMUDES'),
('BT', 'BHOUTAN'),
('BO', 'BOLIVIE (ÉTAT PLURINATIONAL DE)'),
('BQ', 'BONAIRE, SAINT-EUSTACHE ET SABA'),
('BA', 'BOSNIE-HERZÉGOVINE'),
('BW', 'BOTSWANA'),
('BV', 'BOUVET, ILE'),
('BR', 'BRÉSIL'),
('BN', 'BRUNÉI DARUSSALAM'),
('BG', 'BULGARIE'),
('BF', 'BURKINA FASO'),
('BI', 'BURUNDI'),
('CV', 'CABO VERDE'),
('KY', 'CAÏMANS, ILES'),
('KH', 'CAMBODGE'),
('CM', 'CAMEROUN'),
('CA', 'CANADA'),
('CL', 'CHILI'),
('CN', 'CHINE'),
('CX', 'CHRISTMAS, ÎLE'),
('CY', 'CHYPRE'),
('CC', 'COCOS/KEELING (ÎLES)'),
('CO', 'COLOMBIE'),
('KM', 'COMORES'),
('CG', 'CONGO'),
('CD', 'CONGO, RÉPUBLIQUE DÉMOCRATIQUE DU'),
('CK', 'COOK, ILES'),
('KR', 'CORÉE, RÉPUBLIQUE DE'),
('KP', 'CORÉE, RÉPUBLIQUE POPULAIRE DÉMOCRATIQUE DE'),
('CR', 'COSTA RICA'),
('CI', 'CÔTE D''IVOIRE'),
('HR', 'CROATIE'),
('CU', 'CUBA'),
('CW', 'CURAÇAO'),
('DK', 'DANEMARK'),
('DJ', 'DJIBOUTI'),
('DO', 'DOMINICAINE, RÉPUBLIQUE'),
('DM', 'DOMINIQUE'),
('EG', 'EGYPTE'),
('SV', 'EL SALVADOR'),
('AE', 'EMIRATS ARABES UNIS'),
('EC', 'EQUATEUR'),
('ER', 'ERYTHRÉE'),
('ES', 'ESPAGNE'),
('EE', 'ESTONIE'),
('US', 'ETATS-UNIS D''AMÉRIQUE'),
('ET', 'ETHIOPIE'),
('FK', 'FALKLAND/MALOUINES (ÎLES)'),
('FO', 'FÉROÉ, ÎLES'),
('FJ', 'FIDJI'),
('FI', 'FINLANDE'),
('FR', 'FRANCE'),
('GA', 'GABON'),
('GM', 'GAMBIE'),
('GE', 'GÉORGIE'),
('GS', 'GÉORGIE DU SUD ET LES ÎLES SANDWICH DU SUD'),
('GH', 'GHANA'),
('GI', 'GIBRALTAR'),
('GR', 'GRÈCE'),
('GD', 'GRENADE'),
('GL', 'GROENLAND'),
('GP', 'GUADELOUPE'),
('GU', 'GUAM'),
('GT', 'GUATEMALA'),
('GG', 'GUERNESEY'),
('GN', 'GUINÉE'),
('GW', 'GUINÉE-BISSAU'),
('GQ', 'GUINÉE ÉQUATORIALE'),
('GY', 'GUYANA'),
('GF', 'GUYANE FRANÇAISE'),
('HT', 'HAÏTI'),
('HM', 'HEARD, ILE ET MACDONALD, ÎLES'),
('HN', 'HONDURAS'),
('HK', 'HONG KONG'),
('HU', 'HONGRIE'),
('IM', 'ÎLE DE MAN'),
('UM', 'ÎLES MINEURES ÉLOIGNÉES DES ETATS-UNIS'),
('VG', 'ÎLES VIERGES BRITANNIQUES'),
('VI', 'ÎLES VIERGES DES ETATS-UNIS'),
('IN', 'INDE'),
('IO', 'INDIEN (TERRITOIRE BRITANNIQUE DE L''OCÉAN)'),
('ID', 'INDONÉSIE'),
('IR', 'IRAN, RÉPUBLIQUE ISLAMIQUE D'''),
('IQ', 'IRAQ'),
('IE', 'IRLANDE'),
('IS', 'ISLANDE'),
('IL', 'ISRAËL'),
('IT', 'ITALIE'),
('JM', 'JAMAÏQUE'),
('JP', 'JAPON'),
('JE', 'JERSEY'),
('JO', 'JORDANIE'),
('KZ', 'KAZAKHSTAN'),
('KE', 'KENYA'),
('KG', 'KIRGHIZISTAN'),
('KI', 'KIRIBATI'),
('KW', 'KOWEÏT'),
('LA', 'LAO, RÉPUBLIQUE DÉMOCRATIQUE POPULAIRE'),
('LS', 'LESOTHO'),
('LV', 'LETTONIE'),
('LB', 'LIBAN'),
('LR', 'LIBÉRIA'),
('LY', 'LIBYE'),
('LI', 'LIECHTENSTEIN'),
('LT', 'LITUANIE'),
('LU', 'LUXEMBOURG'),
('MO', 'MACAO'),
('MK', 'MACÉDOINE, L''EX-RÉPUBLIQUE YOUGOSLAVE DE'),
('MG', 'MADAGASCAR'),
('MY', 'MALAISIE'),
('MW', 'MALAWI'),
('MV', 'MALDIVES'),
('ML', 'MALI'),
('MT', 'MALTE'),
('MP', 'MARIANNES DU NORD, ILES'),
('MA', 'MAROC'),
('MH', 'MARSHALL, ILES'),
('MQ', 'MARTINIQUE'),
('MU', 'MAURICE'),
('MR', 'MAURITANIE'),
('YT', 'MAYOTTE'),
('MX', 'MEXIQUE'),
('FM', 'MICRONÉSIE, ETATS FÉDÉRÉS DE'),
('MD', 'MOLDOVA, RÉPUBLIQUE DE'),
('MC', 'MONACO'),
('MN', 'MONGOLIE'),
('ME', 'MONTÉNÉGRO'),
('MS', 'MONTSERRAT'),
('MZ', 'MOZAMBIQUE'),
('MM', 'MYANMAR'),
('NA', 'NAMIBIE'),
('NR', 'NAURU'),
('NP', 'NÉPAL'),
('NI', 'NICARAGUA'),
('NE', 'NIGER'),
('NG', 'NIGÉRIA'),
('NU', 'NIUE'),
('NF', 'NORFOLK, ILE'),
('NO', 'NORVÈGE'),
('NC', 'NOUVELLE-CALÉDONIE'),
('NZ', 'NOUVELLE-ZÉLANDE'),
('OM', 'OMAN'),
('UG', 'OUGANDA'),
('UZ', 'OUZBÉKISTAN'),
('PK', 'PAKISTAN'),
('PW', 'PALAOS'),
('PS', 'PALESTINE, ETAT DE'),
('PA', 'PANAMA'),
('PG', 'PAPOUASIE-NOUVELLE-GUINÉE'),
('PY', 'PARAGUAY'),
('NL', 'PAYS-BAS'),
('XX', 'PAYS INCONNU'),
('ZZ', 'PAYS MULTIPLES'),
('PE', 'PÉROU'),
('PH', 'PHILIPPINES'),
('PN', 'PITCAIRN'),
('PL', 'POLOGNE'),
('PF', 'POLYNÉSIE FRANÇAISE'),
('PR', 'PORTO RICO'),
('PT', 'PORTUGAL'),
('QA', 'QATAR'),
('SY', 'RÉPUBLIQUE ARABE SYRIENNE'),
('CF', 'RÉPUBLIQUE CENTRAFRICAINE'),
('RE', 'RÉUNION'),
('RO', 'ROUMANIE'),
('GB', 'ROYAUME-UNI DE GRANDE-BRETAGNE ET D''IRLANDE DU NORD'),
('RU', 'RUSSIE, FÉDÉRATION DE'),
('RW', 'RWANDA'),
('EH', 'SAHARA OCCIDENTAL'),
('BL', 'SAINT-BARTHÉLEMY'),
('KN', 'SAINT-KITTS-ET-NEVIS'),
('SM', 'SAINT-MARIN'),
('MF', 'SAINT-MARTIN (PARTIE FRANÇAISE)'),
('SX', 'SAINT-MARTIN (PARTIE NÉERLANDAISE)'),
('PM', 'SAINT-PIERRE-ET-MIQUELON'),
('VA', 'SAINT-SIÈGE'),
('VC', 'SAINT-VINCENT-ET-LES-GRENADINES'),
('SH', 'SAINTE-HÉLÈNE, ASCENSION ET TRISTAN DA CUNHA'),
('LC', 'SAINTE-LUCIE'),
('SB', 'SALOMON, ILES'),
('WS', 'SAMOA'),
('AS', 'SAMOA AMÉRICAINES'),
('ST', 'SAO TOMÉ-ET-PRINCIPE'),
('SN', 'SÉNÉGAL'),
('RS', 'SERBIE'),
('SC', 'SEYCHELLES'),
('SL', 'SIERRA LEONE'),
('SG', 'SINGAPOUR'),
('SK', 'SLOVAQUIE'),
('SI', 'SLOVÉNIE'),
('SO', 'SOMALIE'),
('SD', 'SOUDAN'),
('SS', 'SOUDAN DU SUD'),
('LK', 'SRI LANKA'),
('SE', 'SUÈDE'),
('CH', 'SUISSE'),
('SR', 'SURINAME'),
('SJ', 'SVALBARD ET ÎLE JAN MAYEN'),
('SZ', 'SWAZILAND'),
('TJ', 'TADJIKISTAN'),
('TW', 'TAÏWAN, PROVINCE DE CHINE'),
('TZ', 'TANZANIE, RÉPUBLIQUE UNIE DE'),
('TD', 'TCHAD'),
('CS', 'TCHÉCOSLOVAQUIE'),
('CZ', 'TCHÈQUE, RÉPUBLIQUE'),
('TF', 'TERRES AUSTRALES FRANÇAISES'),
('TH', 'THAÏLANDE'),
('TL', 'TIMOR-LESTE'),
('TG', 'TOGO'),
('TK', 'TOKELAU'),
('TO', 'TONGA'),
('TT', 'TRINITÉ-ET-TOBAGO'),
('TN', 'TUNISIE'),
('TM', 'TURKMÉNISTAN'),
('TC', 'TURKS-ET-CAÏCOS (ÎLES)'),
('TR', 'TURQUIE'),
('TV', 'TUVALU'),
('UA', 'UKRAINE'),
('SU', 'URSS'),
('UY', 'URUGUAY'),
('VU', 'VANUATU'),
('VE', 'VENEZUELA (RÉPUBLIQUE BOLIVARIENNE DU)'),
('VN', 'VIET NAM'),
('VD', 'VIET NAM (SUD)'),
('WF', 'WALLIS ET FUTUNA'),
('YE', 'YÉMEN'),
('YU', 'YOUGOSLAVIE'),
('ZR', 'ZAÏRE'),
('ZM', 'ZAMBIE'),
('ZW', 'ZIMBABWE');


INSERT INTO secteur_activite (code_secteur_activite, libelle_secteur_activite)
VALUES 
    ('IT', 'TECHNOLOGIES DE L''INFORMATION'),
    ('FINANCE', 'SERVICES FINANCIERS'),
    ('SANTE', 'SOINS DE SANTÉ'),
    ('FABRIQUE', 'FABRICATION'),
    ('EDUCATION', 'ÉDUCATION'),
    ('HOTELLERIE', 'HÔTELLERIE ET RESTAURATION'),
    ('ENERGIE', 'ÉNERGIE'),
    ('MENUISIER', 'MENUISIER');


INSERT INTO prestataires_secteur (ninea, code_secteur_activite)
VALUES 
    ('005177614', 'IT'),
    ('005174222', 'FINANCE'),
    ('005192373', 'SANTE');


INSERT INTO type_energie (code_type_energie, libelle_type_energie)
VALUES ('ESSENCE', 'ESSENCE'),
       ('GASOIL', 'GASOIL'),
       ('ELECTRIQUE', 'ELECTRIQUE'),
       ('HYBRIDE', 'HYBRIDE');


INSERT INTO type_vehicule (code_type_vehicule, libelle_type_vehicule)
VALUES ('TV1', 'VP'),
       ('TV2', 'PICK-UP'),
       ('TV3', 'BUS'),
       ('TV4', 'CAMIONNETTE'),
       ('TV5', '4X4');




INSERT INTO "vehicule" ("numero_serie", "date_mise_en_circulation", "libelle_etat_vehicule", "modele", "numero_carte_grise", "numero_immatriculation", "code_article_bon_entree", "identifiant_bon_entree", "code_marque", "code_pays", "code_type_energie", "code_type_vehicule") VALUES
('123456',  '2023-01-01',   'NEUF', 'CAMRY',    'CG123',    'ABC123',   1,  'BESA202312011043210',  'TOY',  'US',   'ESSENCE',  'TV1'),
('789012',  '2023-01-02',   'NEUF', 'MUSTANG',    'CG789',    'XYZ789',   1,  'BESM202312021143211',  'FOR',  'JP',   'GASOIL',  'TV2'),
('789013',  '2023-01-02',   'NEUF', 'ESCAPE',    'CG789',    'XYZ789',   2,  'BESM202312021143211',  'FOR',  'JP',   'GASOIL',  'TV2'),
('345678',  '2023-01-03',   'USAGE', 'X5',    'CG345',    'DEF345',   1,  'BESG202312031243213',  'BMW',  'FR',   'HYBRIDE',  'TV3');


INSERT INTO "dotation_vehicule" ("identifiant_d_v", "date_dotation", "code_article_bon_sortie", "identifiant_bon_sortie", "matricule_agent", "numero_serie") VALUES
('DVSG202311121243214',	'2024-01-24',	1,	'BSSG202311121243214',	'613693H',	'123456'),
('DVSG202311121243216',	'2024-01-22',	1,	'BSSG202311121243216',	'622543E',	'789012'),
('DVSG202311121243215',	'2024-01-23',	1,	'BSSG202311121243215',	'506234B',	'789013');


INSERT INTO "controle" ("date_controle", "observation_controle", "numero_serie") VALUES
('2024-03-02 13:42:06.377043',  'OBSERVATION CONTROLE 1',   '123456'),
('2024-03-03 13:42:06.377043',  'OBSERVATION CONTROLE 2',   '789012'),
('2024-03-04 13:42:06.377043',  'OBSERVATION CONTROLE 3',   '789013');


INSERT INTO "utilisateur" ("utilisateur_id", "is_active", "is_not_locked", "join_date", "last_login_date", "last_login_date_display", "mot_de_passe", "user_name", "code_fonction", "matricule_agent") VALUES
(1,	't',	't',	'2024-03-02 13:45:32.901327',	'2024-03-02 13:45:32.901327',	'2024-03-02 13:45:32.901327',	'$2a$10$FWHTlMKYpU5OHsf5fv1f..oR.SHKk/4xp/T/7Sdx1HghBEPnrbWeK',	'613693H',	'ADMIN',	'613693H'),
(2,	't',	't',	'2024-03-03 13:45:32.901327',	'2024-03-03 13:45:32.901327',	'2024-03-03 13:45:32.901327',	'$2a$10$Z.esrVqyc3o.MUdOBln6YulZD2xQIlT1auSHlltmC/X7SJCo7aODS',	'506234B',	'ADMIN',	'506234B'),
(3,	't',	't',	'2024-03-04 13:45:32.901327',	'2024-03-04 13:45:32.901327',	'2024-03-04 13:45:32.901327',	'$2a$10$4G6IGiPhj27OiNDE1Heufug9D31QZ/30OrsTPWs/YkP8fBx9PMy9G',	'622543E',	'ADMIN',	'622543E');




INSERT INTO "authorities" ("code_authority", "name_authorities") VALUES
(1, 'ADMINISTRATEUR'),
(2, 'UTILISATEUR');



INSERT INTO "utilisateur_authority" ("utilisateur_id", "code_authority") VALUES
(1, 1),
(2, 1),
(3, 1);
