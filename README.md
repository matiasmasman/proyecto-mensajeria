# proyecto
npm init --yes
npm i express morgan mysql multer
npm i nodemon -D
npm i mime-types

en package.json modificar script: 
"scripts": {
    "dev": "nodemon src/index.js"
},

#database
// crear base de datos y tablas, falta relacionarlas y asignarle la clave foránea.

CREATE DATABASE IF NOT EXISTS apirest;
USE apirest;
CREATE TABLE escuela (
	id INT (11) NOT NULL AUTO_INCREMENT,
	nombre VARCHAR (20) DEFAULT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE alumnos (
	id_alumnos INT (11) NOT NULL AUTO_INCREMENT,
	nombre VARCHAR (20) DEFAULT NULL,
	id_escuela INT (11),
	PRIMARY KEY (id_alumnos)
);

CREATE TABLE mensaje (
	id_mensaje INT (11) NOT NULL AUTO_INCREMENT,
	text VARCHAR (100) DEFAULT NULL,
	destinatario INT (11),
	id_alumnos INT (11)
	PRIMARY KEY (id_mensaje)
);

// crear procedimientos almacenados

USE apirest;
DELIMITER //
CREATE PROCEDURE alumnosAddOrEdit (
	IN _id_alumnos INT,
	IN _nombre VARCHAR (20)
)
BEGIN
	IF _id_alumnos = 0 THEN
		INSERT INTO alumnos (nombre) VALUES (_nombre);
    
    	SET _id_alumnos = LAST_INSERT_ID();
	ELSE
    	UPDATE alumnos
        SET nombre = _nombre
            WHERE id_alumnos = _id_alumnos;
	END IF;
    
    SELECT _id_alumnos AS id_alumnos;
END
//

USE apirest;
DELIMITER //
CREATE PROCEDURE escuelaAddOrEdit (
	IN _id INT,
	IN _nombre VARCHAR (20)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO escuela (nombre) VALUES (_nombre);
    
    	SET _id = LAST_INSERT_ID();
	ELSE
    	UPDATE escuela
        SET nombre = _nombre
            WHERE id = _id;
	END IF;
    
    SELECT _id AS id;
END
//

USE apirest;
DELIMITER //
CREATE PROCEDURE creaMail (
	IN _id_mensaje INT,
	IN _text VARCHAR (100),
	IN _destinatario INT,
	IN _id_alumnos INT
)
BEGIN
	INSERT INTO mensaje (id_mensaje, text, destinatario, id_alumnos) 
	VALUES (_id_mensaje, _text, _destinatario, _id_alumnos);
END
//

// relaciones entre tablas
![Captura de pantalla (63)](https://user-images.githubusercontent.com/101646392/176952427-ef76f1b1-a989-44a7-86cb-96162b05f958.png)
