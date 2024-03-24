
CREATE TABLE "public"."VEHICULE" (
    "NUMERO_SERIE" CHARACTER VARYING(30) NOT NULL,
    "DATE_MISE_EN_CIRCULATION" DATE,
    "LIBELLE_ETAT_VEHICULE" CHARACTER VARYING(10),
    "MODELE" CHARACTER VARYING(50),
    "NUMERO_CARTE_GRISE" CHARACTER VARYING(30),
    "NUMERO_IMMATRICULATION" CHARACTER VARYING(20),
    "CODE_ARTICLE_BON_ENTREE" INTEGER,
    "IDENTIFIANT_B_E" CHARACTER VARYING(255),
    "CODE_MARQUE" CHARACTER VARYING(25),
    "CODE_PAYS" CHARACTER VARYING(3),
    "CODE_TYPE_ENERGIE" CHARACTER VARYING(25),
    "CODE_TYPE_VEHICULE" CHARACTER VARYING(20),
    CONSTRAINT "VEHICULE_PKEY" PRIMARY KEY ("NUMERO_SERIE")
);


CREATE TABLE "public"."MAINTENANCE" (
    "IDENTIFIANT_MAINTENANCE" CHARACTER VARYING(25) NOT NULL, -- EXEMPLE : MSG202311121243214 (SG+HEURE EN TIMESTAMP)
    "NUMERO_SERIE" CHARACTER VARYING(30),
    "DATE_DEBUT_MAINTENANCE" TIMESTAMP,
    "DATE_FIN_MAINTENANCE" TIMESTAMP,
    "TYPE_MAINTENANCE" CHARACTER VARYING(15),
    "OBSERVATION_MAINTENANCE" CHARACTER VARYING(512),
    CONSTRAINT "MAINTENANCE_PKEY" PRIMARY KEY ("IDENTIFIANT_MAINTENANCE")
);


CREATE TABLE "public"."ACCIDENT" (
    "IDENTIFIANT_ACCIDENT" CHARACTER VARYING(25) NOT NULL, -- EXEMPLE : MSG202311121243214 (SG+HEURE EN TIMESTAMP)
    "DATE_INCIDENT" TIMESTAMP,
    "LIEU_INCIDENT" CHARACTER VARYING(512),
    "RAPPORT_INCIDENT" BLOB,
    "COMMENTAIRE_INCIDENT" CHARACTER VARYING(512),
    "NOMBRE_DECES" INTEGER,
    "NOMBRE_BLESSE" INTEGER,
    CONSTRAINT "ACCIDENT_PKEY" PRIMARY KEY ("IDENTIFIANT_ACCIDENT")
);


CREATE TABLE "public"."CHANGEMENT_PIECE" (
    "IDENTIFIANT_REPARATION" CHARACTER VARYING(25) NOT NULL, -- EXEMPLE : MSG202311121243214 (SG+HEURE EN TIMESTAMP)
    "NOMBRE_PIECES_RECHANGEES" INTEGER,
    "REFERENCE_PIECES" CHARACTER VARYING(512),
    CONSTRAINT "CHANGEMENT_PIECE_PKEY" PRIMARY KEY ("IDENTIFIANT_REPARATION")
);


CREATE TABLE "public"."REPARATION" (
    "IDENTIFIANT_MAINTENANCE" CHARACTER VARYING(25) NOT NULL, -- EXEMPLE : MSG202311121243214 (SG+HEURE EN TIMESTAMP)
    "IDENTIFIANT_ACCIDENT" CHARACTER VARYING(25) NOT NULL,
    "MOTIF_REPARATION" CHARACTER VARYING(512),
    CONSTRAINT "REPARATION_PKEY" PRIMARY KEY ("IDENTIFIANT_MAINTENANCE", "IDENTIFIANT_ACCIDENT")
);


CREATE TABLE "public"."VIDANGE" (
    "IDENTIFIANT_MAINTENANCE" CHARACTER VARYING(25) NOT NULL, -- EXEMPLE : MSG202311121243214 (SG+HEURE EN TIMESTAMP)
    "LIBELLE_HUILE" CHARACTER VARYING(512),
    "QUANTITE_MISE_VEHICULE" INTEGER,
    CONSTRAINT "VIDANGE_PKEY" PRIMARY KEY ("IDENTIFIANT_MAINTENANCE")
);


CREATE TABLE "public"."TOLERIE" (
    "IDENTIFIANT_TOLERIE" CHARACTER VARYING(25) NOT NULL,
    "DESCRIPTION_TOLERIE" CHARACTER VARYING(512),
    CONSTRAINT "TOLERIE_PKEY" PRIMARY KEY ("IDENTIFIANT_TOLERIE")
);


CREATE TABLE "public"."ACCIDENT" (
    "IDENTIFIANT_ACCIDENT" CHARACTER VARYING(25) NOT NULL,
    "DATE_INCIDENT" TIMESTAMP,
    "LIEU_INCIDENT" CHARACTER VARYING(512),
    "RAPPORT_INCIDENT" BLOB,
    "COMMENTAIRE_INCIDENT" CHARACTER VARYING(512),
    "NOMBRE_DECES" INTEGER,
    "NOMBRE_BLESSE" INTEGER,
    CONSTRAINT "ACCIDENT_PKEY" PRIMARY KEY ("IDENTIFIANT_ACCIDENT")
);