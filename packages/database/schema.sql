
CREATE TABLE Coordenada (
  coor_id SERIAL PRIMARY KEY,
  latitud FLOAT NOT NULL,
  longitud FLOAT NOT NULL,
  direccion VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO Coordenada(latitud,longitud, direccion) VALUES (123,1245, 'Carrera 32 #76-32');

CREATE TYPE medio_pago_tipo AS ENUM ('Debito', 'Credito');

CREATE TABLE Medio_Pago (
  numero_cuenta SERIAL PRIMARY KEY,
  tipo medio_pago_tipo NOT NULL
);

CREATE TABLE Usuario (
    user_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    celular VARCHAR(255) UNIQUE NOT NULL,
    coor_id INTEGER REFERENCES Coordenada(coor_id) NOT NULL
);

CREATE TABLE Cliente (
    cliente_id SERIAL PRIMARY KEY,
    recibo VARCHAR(255) NOT NULL,
    numero_cuenta INTEGER REFERENCES Medio_Pago(numero_cuenta) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES Usuario(user_id) UNIQUE NOT NULL
);

CREATE TABLE Trabajador (
    trabajador_id SERIAL PRIMARY KEY,
    foto_perfil VARCHAR(255) NOT NULL,
    disponible BOOLEAN,
    calificacion INTEGER,
    doc_foto VARCHAR(255) UNIQUE NOT NULL,
    cuenta VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES Usuario(user_id) UNIQUE NOT NULL
);


CREATE TYPE labor_tipo AS ENUM ('Carpinteria', 'Electricidad', 'Plomeria', 'Pintura', 'Jardineria', 'Albañileria', 'Mecanica', 'Tecnologia', 'Cocina', 'Limpieza');

CREATE TABLE Labor (
    labor_id SERIAL PRIMARY KEY,
    labor labor_tipo NOT NULL UNIQUE
);

CREATE TYPE asunto_tipo AS ENUM ('Contrato', 'Finalizacion');

CREATE TABLE Notificacion (
    notificacion_id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    asunto asunto_tipo NOT NULL,
    user_id INTEGER REFERENCES Usuario(user_id) NOT NULL
);

CREATE TABLE Transaccion (
    transanccion_id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    monto FLOAT NOT NULL
);

CREATE TYPE tipo_trabajo AS ENUM ('precio_por_hora', 'unidad_de_trabajo');

CREATE TABLE Ejerce (
    ejerce_id SERIAL PRIMARY KEY,
    trabajador_id INTEGER REFERENCES Trabajador(trabajador_id) NOT NULL,
    labor_id INTEGER REFERENCES Labor(labor_id) NOT NULL,
    tipo_trabajo tipo_trabajo NOT NULL,
    precio FLOAT NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE Contrato (
    contrato_id SERIAL PRIMARY KEY,
    ejerce_id INTEGER REFERENCES Ejerce(ejerce_id) NOT NULL,
    cliente_id INTEGER REFERENCES Cliente(cliente_id) NOT NULL,
    calificacion INTEGER ,
    descripcion VARCHAR(255),
    fecha_i DATE NOT NULL,
    fecha_f DATE,
    transaccion_id INTEGER REFERENCES Transaccion(transanccion_id) 
);



/*ADICIONALES*/
--Añadir un trabajador
CREATE OR REPLACE FUNCTION crear_trabajador(
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    contrasena VARCHAR(255),
    latitud FLOAT,
    longitud FLOAT,
    direccion VARCHAR(255),
    foto_perfil VARCHAR(255),
    doc_foto VARCHAR(255),
    cuenta VARCHAR(255),
    celular VARCHAR(255)
) RETURNS INTEGER AS $$
BEGIN
    -- Crear una nueva fila en la tabla Coordenada
    INSERT INTO Coordenada (latitud, longitud, direccion) VALUES (latitud, longitud, direccion) RETURNING coor_id;
    -- Crear una nueva fila en la tabla Usuario con la relación a la coordenada recién creada
    INSERT INTO Usuario (nombre, apellido, email, contrasena, celular, coor_id) VALUES (nombre, apellido, email, contrasena, celular, coor_id) RETURNING user_id;
    -- Crear una nueva fila en la tabla Trabajador con la relación al usuario recién creado
    INSERT INTO Trabajador (foto_perfil, doc_foto, cuenta, user_id,disponible,calificacion) VALUES (foto_perfil, doc_foto, cuenta, user_id,true,null);
    RETURN user_id;
END;
$$ LANGUAGE plpgsql;

--Añadir un cliente
CREATE OR REPLACE FUNCTION crear_cliente(
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  email VARCHAR(255),
  contrasena VARCHAR(255),
  latitud FLOAT,
  longitud FLOAT,
  direccion VARCHAR(255),
  recibo VARCHAR(255),
  celular VARCHAR(255),
  tipo_cuenta VARCHAR(255)
) RETURNS INTEGER AS $$  
BEGIN
  -- Crear una nueva fila en la tabla Coordenada
  INSERT INTO Coordenada (latitud, longitud, direccion) VALUES (latitud, longitud, direccion) RETURNING coor_id;
  -- Crear una nueva fila en la tabla Usuario con la relación a la coordenada recién creada
  INSERT INTO Usuario (nombre, apellido, email, contrasena, celular, coor_id) VALUES (nombre, apellido, email, contrasena, celular, coor_id) RETURNING user_id;
  -- Crear una nueva fila en la tabla Medio_Pago
  INSERT INTO Medio_Pago (tipo) VALUES (tipo_cuenta) RETURNING numero_cuenta;
  -- Crear una nueva fila en la tabla Cliente con la relación al usuario recién creado y al medio de pago recién creado
  INSERT INTO Cliente (recibo, numero_cuenta, user_id) VALUES (recibo, numero_cuenta, user_id);
  RETURN user_id;
END;
$$ LANGUAGE plpgsql;



--Verificar que un email este en uso, devuelve true si esta en uso
CREATE OR REPLACE FUNCTION verificar_email(email VARCHAR(255)) RETURNS BOOLEAN AS $$
DECLARE email_en_uso BOOLEAN;
BEGIN
    SELECT EXISTS (SELECT email FROM Usuario WHERE email = email) INTO email_en_uso;
    RETURN email_en_uso;
END;
$$ LANGUAGE plpgsql;

--Verificar loguin de trabajador
CREATE OR REPLACE FUNCTION verificar_login_trabajador(celular VARCHAR(255), contrasena VARCHAR(255)) RETURNS INTEGER AS $$
BEGIN
  -- Consultar en la tabla Usuario si existe un trabajador con el celular y contraseña especificados
  SELECT user_id FROM Usuario WHERE celular = celular AND contrasena = contrasena;
  IF FOUND THEN
      -- Consultar en la tabla Trabajador si el usuario encontrado en la tabla Usuario tiene un trabajador asociado
      SELECT trabajador_id FROM Trabajador WHERE user_id = user_id;
      IF FOUND THEN
        RETURN trabajador_id;
      ELSE
        RETURN -1;
      END IF;
  ELSE
      RETURN -1;
  END IF;
END;
$$ LANGUAGE plpgsql;

--Verificar loguin de cliente
CREATE OR REPLACE FUNCTION verificar_login_cliente(celular VARCHAR(255), contrasena VARCHAR(255)) RETURNS INTEGER AS $$
BEGIN
  -- Consultar en la tabla Usuario si existe un trabajador con el celular y contraseña especificados
  SELECT user_id FROM Usuario WHERE celular = celular AND contrasena = contrasena;
  IF FOUND THEN
      -- Consultar en la tabla Trabajador si el usuario encontrado en la tabla Usuario tiene un trabajador asociado
      SELECT cliente_id FROM Cliente WHERE user_id = user_id;
      IF FOUND THEN
        RETURN cliente_id;
      ELSE
        RETURN -1;
      END IF;
  ELSE
      RETURN -1;
  END IF;
END;
$$ LANGUAGE plpgsql;



--Verificar que una cuenta de trabajador este en uso
CREATE OR REPLACE FUNCTION verificar_cuenta_trabajador(numero_cuenta VARCHAR(255))
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (SELECT EXISTS(SELECT 1 FROM Trabajador WHERE cuenta = numero_cuenta));
END;
$$ LANGUAGE plpgsql;

--Verificar que un celular este en uso
CREATE OR REPLACE FUNCTION verificar_celular(celular VARCHAR(255)) RETURNS BOOLEAN AS $$
BEGIN
  -- Consultar en la tabla Usuario si existe un usuario con el número de celular dado
  SELECT COUNT(*) FROM Usuario WHERE celular = celular;
  -- Si existe al menos una fila con el número de celular dado, retornar true, en otro caso, false
  IF count > 0 THEN
      RETURN true;
  ELSE
      RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql;


-- Insertar un labor de un trabajador
CREATE OR REPLACE FUNCTION crear_relacion_ejerce(trabajador_id INTEGER, labor VARCHAR(255), tipo_trabajo VARCHAR(255), precio FLOAT, descripcion VARCHAR(255))
RETURNS BOOLEAN AS $$
DECLARE
labor_id INTEGER;
BEGIN
-- Verificar si el labor ya existe
SELECT labor_id INTO labor_id FROM Labor WHERE labor = labor;
IF NOT FOUND THEN
-- Crear nueva fila en la tabla Labor
INSERT INTO Labor (labor) VALUES (labor) RETURNING labor_id INTO labor_id;
END IF;
-- Crear nueva fila en la tabla Ejerce
INSERT INTO Ejerce (trabajador_id, labor_id, tipo_trabajo, precio, descripcion) 
VALUES (trabajador_id, labor_id, tipo_trabajo, precio, descripcion);
RETURN true;
EXCEPTION
WHEN unique_violation THEN
RETURN false;
END;
$$ LANGUAGE plpgsql;

-- Actualiza automáticamente la disponibilidad del trabajador asociado a un contrato al momento de insertar una nueva fila en la tabla de contrato
CREATE OR REPLACE FUNCTION actualizar_disponibilidad()
RETURNS TRIGGER
AS
$BODY$
BEGIN
  UPDATE Trabajador
  SET disponible = false
  WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id);
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER actualizar_disponibilidad
AFTER INSERT ON Contrato
FOR EACH ROW EXECUTE FUNCTION actualizar_disponibilidad();



-- Trigger para actualizar el estado de disponibilidad de un trabajador al finalizar un contrato
CREATE OR REPLACE FUNCTION update_trabajador_disponibilidad()
RETURNS TRIGGER
AS
$BODY$
BEGIN
  IF (NEW.fecha_f IS NOT NULL) THEN
    UPDATE Trabajador SET disponible = true WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id);
  END IF;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER update_trabajador_disponibilidad
AFTER UPDATE ON Contrato
FOR EACH ROW
EXECUTE FUNCTION update_trabajador_disponibilidad();



-- Trigger para actualizar la calificación promedio de un trabajador al agregar una calificación a un contrato:
CREATE OR REPLACE FUNCTION update_promedio_calificacion()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.calificacion IS NOT NULL) THEN
    UPDATE Trabajador SET calificacion = (SELECT AVG(calificacion) FROM Contrato WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id)) WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_promedio_calificacion
AFTER UPDATE ON Contrato
FOR EACH ROW
EXECUTE FUNCTION update_promedio_calificacion();


-- Vista para mostrar información de los contratos de un cliente
CREATE VIEW contratos_cliente AS
SELECT contrato_id, ejerce.labor_id, labor, fecha_i, fecha_f, calificacion
FROM Contrato 
JOIN Ejerce ON Contrato.ejerce_id = Ejerce.ejerce_id
JOIN Labor ON Ejerce.labor_id = Labor.labor_id;

--Un usuario solicita un servicio
-- CREATE EXTENSION postgis;
-- CREATE EXTENSION cube;
-- CREATE EXTENSION earthdistance;

CREATE OR REPLACE FUNCTION buscar_trabajadores(
  labor_id_in INT,
  latitud_in FLOAT,
  longitud_in FLOAT,
  criterio VARCHAR(255)
) RETURNS TABLE(
  trabajador_id INTEGER,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  calificacion INT,
  precio FLOAT,
  tipo_trabajo VARCHAR(255),
  descripcion VARCHAR(255),
  distancia FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
  t.trabajador_id,
  u.nombre,
  u.apellido,
  t.calificacion,
  e.precio,
  e.tipo_trabajo,
  e.descripcion,
  earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia
  FROM Ejerce e
  JOIN Trabajador t ON e.trabajador_id = t.trabajador_id
  JOIN Usuario u ON u.user_id = t.user_id
  JOIN Coordenada c ON c.coor_id = u.coor_id
  WHERE (e.labor_id = labor_id_in OR (labor_id_in = 0 OR labor_id_in IS NULL)) AND t.disponible = true
  ORDER BY
  CASE criterio
  WHEN 'calificacion' THEN t.calificacion
  WHEN 'precio' THEN e.precio
  ELSE distancia
  END;
END;
$$ LANGUAGE plpgsql;

--Crear un contrato
CREATE OR REPLACE FUNCTION crear_contrato(ejerce_id INTEGER, cliente_id INTEGER, descripcion VARCHAR(255))
RETURNS INTEGER AS $$
	DECLARE
	transaccion_id INTEGER;
BEGIN
	INSERT INTO Transaccion (fecha, monto) VALUES (NULL, NULL) RETURNING transaccion_id;
	INSERT INTO Contrato (ejerce_id, cliente_id, descripcion, calificacion, fecha_i, fecha_f, transaccion_id) VALUES (ejerce_id, cliente_id, descripcion, NULL, NOW(), NULL, transaccion_id) RETURNING contrato_id;
	RETURN contrato_id;
END;
$$ LANGUAGE plpgsql;

--Trigger para notificacion
CREATE OR REPLACE FUNCTION enviar_notificacion()
RETURNS TRIGGER
AS
$BODY$
  DECLARE direccion VARCHAR(255);
  DECLARE labor VARCHAR(255);
  DECLARE asunto VARCHAR(255);
  DECLARE trabajador_id INTEGER;
BEGIN
  SELECT direccion FROM Coordenada WHERE coor_id = (SELECT coor_id FROM Usuario WHERE user_id = NEW.cliente_id) INTO direccion;
  SELECT labor FROM Labor WHERE labor_id = (SELECT labor_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id) INTO labor;
  SELECT (CASE
  WHEN NEW.fecha_f IS NULL THEN 'Contrato'
    ELSE 'Finalizacion'
  END) INTO asunto;
  SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id INTO trabajador_id;

  INSERT INTO Notificaciones (fecha, asunto, user_id, mensaje)
  VALUES (NOW(), asunto,
  CASE asunto
  WHEN 'Contrato' THEN trabajador_id
  WHEN 'Finalizacion' THEN NEW.cliente_id
END,
  CASE asunto
    WHEN 'Contrato' THEN 'Te informamos que el usuario '|| (SELECT nombre || ' ' || apellido FROM Usuario WHERE user_id = NEW.cliente_id) || ' te contrato para el labor de ' || labor || ' en la direccion ' || direccion
    WHEN 'Finalizacion' THEN 'El trabajador ' || (SELECT nombre || ' ' || apellido FROM Usuario WHERE user_id = trabajador_id) || ' ha finalizado el trabajo de ' || labor || ' en la direccion ' || direccion
  END);
RETURN NULL;
END;
$BODY$
LANGUAGE plpgsql;


CREATE TRIGGER notificar_usuario
AFTER INSERT ON Contrato
FOR EACH ROW
EXECUTE FUNCTION enviar_notificacion();

-- Funcion para saber que trabajo esta haciendo un trabajador
CREATE OR REPLACE FUNCTION trabajo_actual(trabajador_id INTEGER)
RETURNS TABLE (contrato_id INTEGER, ejerce_id INTEGER, cliente_id INTEGER, calificacion INTEGER, fecha_i DATE, fecha_f DATE) AS $$
BEGIN
  RETURN QUERY SELECT contrato_id, ejerce_id, cliente_id, calificacion, fecha_i, fecha_f FROM Contrato 
  WHERE trabajador_id = trabajador_id AND fecha_f IS NULL;
END;
$$ LANGUAGE plpgsql;

--Funcion para calificar y pagar
CREATE OR REPLACE FUNCTION calificar_y_pagar(contrato_id INTEGER, calificacion INTEGER, monto FLOAT)
RETURNS VOID AS $$
BEGIN
  UPDATE Contrato SET calificacion = calificacion WHERE contrato_id = contrato_id;
  UPDATE Transaccion SET fecha = NOW(), monto = monto WHERE transaccion_id = (SELECT transaccion_id FROM Contrato WHERE contrato_id = contrato_id);
END;
$$ LANGUAGE plpgsql;

-- Todos los pagos hechos por clientes
CREATE OR REPLACE FUNCTION obtener_pagos_cliente(cliente_id INTEGER)
RETURNS TABLE(transaccion_id INTEGER, fecha DATE, monto FLOAT)
AS
$BODY$
BEGIN
  RETURN QUERY
  SELECT transaccion_id, fecha, monto
  FROM Transaccion
  WHERE transaccion_id IN (SELECT transaccion_id FROM Contrato WHERE cliente_id = cliente_id);
END;
$BODY$
LANGUAGE plpgsql;

-- Todos los pagos hechos a trabajadores
CREATE OR REPLACE FUNCTION pagos_trabajadores(IN trabajador_id INTEGER)
RETURNS TABLE(fecha DATE, monto FLOAT, numero_cuenta INTEGER) AS
$BODY$
BEGIN
  RETURN QUERY
    SELECT trans.fecha, trans.monto, med.numero_cuenta
    FROM Transaccion trans
    JOIN Contrato con ON trans.transaccion_id = con.transaccion_id
    JOIN Medio_Pago med ON med.numero_cuenta = con.numero_cuenta
    WHERE con.trabajador_id = trabajador_id;
END;
$BODY$
LANGUAGE plpgsql;
