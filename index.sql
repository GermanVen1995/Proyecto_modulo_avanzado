CREATE DATABASE informatica;
USE informatica;

CREATE TABLE usuarios(
    idt_usu INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom TEXT NOT NULL,
    nom_usu VARCHAR(25) NOT NULL,
    apell_usu TEXT NOT NULL,
    correo_usu VARCHAR(50) NOT NULL,
    niv_acc SET("admin", "usuario"),
    psw VARCHAR (255) NOT NULL,
    PRIMARY KEY (idt_usu),
    CONSTRAINT UNIQUE (nom_usu)
);

CREATE TABLE cursos(
    idt_cur INT UNSIGNED NOT NULL AUTO_INCREMENT,
    cod_cur INT NOT NULL,
    comp_cur SET("hardware", "software"),
    nom_cur VARCHAR(40) NOT NULL,
    mod_cur SET("presencial", "online"),
    dur_cur VARCHAR(20) NOT NULL,
    mone_cur SET("bolivares", "dolares", "pesos"),
    pre_cur INT NOT NULL,
    PRIMARY KEY (idt_cur)
);

CREATE TABLE productos(
    idt_pro INT UNSIGNED NOT NULL AUTO_INCREMENT,
    cod_pro INT NOT NULL,
    comp_pro SET("hardware", "software"),
    nom_pro VARCHAR(40) NOT NULL,
    model_pro VARCHAR(40) NOT NULL,
    can_pro INT NOT NULL,
    mone_pro SET("bolivares", "dolares", "pesos"),
    pre_pro INT NOT NULL,
    PRIMARY KEY (idt_pro)
);

CREATE TABLE ventas(
    refe_ven INT,
    PRIMARY KEY (refe_ven)
);

CREATE TABLE factura(
    idt_fact INT NOT NULL,
    fecha_vent DATETIME,
    PRIMARY KEY (idt_fact)
);

CREATE TABLE devolucion(
    idt_fact INT NOT NULL,
    fecha_devol DATETIME
);

CREATE TABLE delivery(
    idt_fact INT NOT NULL,
    dire_entre VARCHAR(50),
    tiem_entre VARCHAR(10)
);
