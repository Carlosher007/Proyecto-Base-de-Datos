
CREATE TABLE Coordenada (
  coor_id SERIAL PRIMARY KEY,
  latitud FLOAT NOT NULL,
  longitud FLOAT NOT NULL,
  direccion VARCHAR(255) NOT NULL
);

CREATE TYPE medio_pago_tipo AS ENUM ('Debito', 'Credito');

CREATE TABLE Medio_Pago (
  medio_pago_id SERIAL PRIMARY KEY,
  numero_cuenta VARCHAR(255) UNIQUE,
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
    numero_cuenta VARCHAR(255) REFERENCES Medio_Pago(numero_cuenta) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES Usuario(user_id) UNIQUE NOT NULL
);

CREATE TABLE Trabajador (
    trabajador_id SERIAL PRIMARY KEY,
    foto_perfil VARCHAR(255) NOT NULL,
    disponible BOOLEAN,
    calificacion FLOAT,
    doc_foto VARCHAR(255) UNIQUE NOT NULL,
    cuenta VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES Usuario(user_id) UNIQUE NOT NULL
);


CREATE TYPE labor_tipo AS ENUM ('Carpinteria', 'Electricidad', 'Plomeria', 'Pintura', 'Jardineria', 'Albañileria', 'Mecanica', 'Tecnologia', 'Cocina', 'Limpieza');

CREATE TABLE Labor (
    labor_id SERIAL PRIMARY KEY,
    labor labor_tipo NOT NULL UNIQUE
);

INSERT INTO Labor(labor) VALUES 
  ('Carpinteria'),
  ('Electricidad'),
  ('Plomeria'),
  ('Pintura'),
  ('Jardineria'),
  ('Albañileria'),
  ('Mecanica'),
  ('Tecnologia'),
  ('Cocina'),
  ('Limpieza');

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
    fecha DATE,
    monto FLOAT
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
    calificacion FLOAT ,
    descripcion VARCHAR(255),
    fecha_i DATE NOT NULL,
    fecha_f DATE,
    transaccion_id INTEGER REFERENCES Transaccion(transanccion_id) 
);

/*ADICIONALES*/
--Añadir un trabajador

CREATE OR REPLACE PROCEDURE crear_trabajador(
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  email VARCHAR(255),
  contrasena VARCHAR(255),
  latitud FLOAT,
  longitud FLOAT,
  direccion_ VARCHAR(255),
  foto_perfil VARCHAR(255),
  doc_foto VARCHAR(255),
  cuenta VARCHAR(255),
  celular VARCHAR(255)
) AS $$
  DECLARE cid INTEGER;
BEGIN
  --Verificar si la coordenada ya existe
  SELECT coor_id FROM Coordenada WHERE direccion = direccion_ INTO cid;

  IF cid IS NULL THEN
    -- Crear una nueva fila en la tabla Coordenada
    INSERT INTO Coordenada (latitud, longitud, direccion) VALUES (latitud, longitud, direccion_);
    -- Crear una nueva fila en la tabla Usuario con la relación a la coordenada recién creada
    INSERT INTO Usuario (nombre, apellido, email, contrasena, celular, coor_id) VALUES (nombre, apellido, email, contrasena, celular, (SELECT coor_id FROM Coordenada ORDER BY coor_id DESC LIMIT 1));
    -- Crear una nueva fila en la tabla Trabajador con la relación al usuario recién creado
    INSERT INTO Trabajador (foto_perfil, disponible, calificacion, doc_foto, cuenta, user_id) VALUES (foto_perfil, TRUE, null,doc_foto, cuenta, (SELECT user_id FROM Usuario ORDER BY user_id DESC LIMIT 1));
  ELSE
    INSERT INTO Usuario (nombre, apellido, email, contrasena, celular, coor_id) VALUES (nombre, apellido, email, contrasena, celular, cid);
    INSERT INTO Trabajador (foto_perfil, disponible, calificacion, doc_foto, cuenta, user_id) VALUES (foto_perfil, TRUE, null,doc_foto, cuenta, (SELECT user_id FROM Usuario ORDER BY user_id DESC LIMIT 1));
  END IF;
END;
$$ LANGUAGE plpgsql;


--Añadir un cliente
CREATE OR REPLACE PROCEDURE crear_cliente(
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  email VARCHAR(255),
  contrasena VARCHAR(255),
  latitud FLOAT,
  longitud FLOAT,
  direccion_ VARCHAR(255),
  recibo VARCHAR(255),
  celular VARCHAR(255),
  num_cuenta VARCHAR(255),
  tipo_cuenta VARCHAR(255)
) AS $$  
DECLARE cid INTEGER;
BEGIN
  --Verificar si la coordenada ya existe
  SELECT coor_id FROM Coordenada WHERE direccion = direccion_ INTO cid;

  IF cid IS NULL THEN
     -- Crear una nueva fila en la tabla Coordenada
    INSERT INTO Coordenada (latitud, longitud, direccion) VALUES (latitud, longitud, direccion_);
    -- Crear una nueva fila en la tabla Usuario con la relación a la coordenada recién creada
    INSERT INTO Usuario (nombre, apellido, email, contrasena, celular, coor_id) VALUES (nombre, apellido, email, contrasena, celular, (SELECT coor_id FROM Coordenada ORDER BY coor_id DESC LIMIT 1));
    -- Crear una nueva fila en la tabla Medio_Pago
    INSERT INTO Medio_Pago (numero_cuenta,tipo) VALUES (num_cuenta,tipo_cuenta::medio_pago_tipo);
    -- Crear una nueva fila en la tabla Cliente con la relación al usuario recién creado y al medio de pago recién creado
    INSERT INTO Cliente (recibo, numero_cuenta, user_id) VALUES (recibo, (SELECT num_cuenta FROM Medio_Pago ORDER BY medio_pago_id DESC LIMIT 1), (SELECT user_id FROM Usuario ORDER BY user_id DESC LIMIT 1));
  ELSE
    INSERT INTO Usuario (nombre, apellido, email, contrasena, celular, coor_id) VALUES (nombre, apellido, email, contrasena, celular, cid);
    INSERT INTO Medio_Pago (numero_cuenta,tipo) VALUES (num_cuenta,tipo_cuenta::medio_pago_tipo);
    INSERT INTO Cliente (recibo, numero_cuenta, user_id) VALUES (recibo, (SELECT num_cuenta FROM Medio_Pago ORDER BY medio_pago_id DESC LIMIT 1), (SELECT user_id FROM Usuario ORDER BY user_id DESC LIMIT 1));
  END IF;
END;
$$ LANGUAGE plpgsql;


--Verificar que un email este en uso, devuelve true si esta en uso
CREATE OR REPLACE FUNCTION verificar_email(email_ VARCHAR(255)) RETURNS TABLE(id INTEGER) AS $$
BEGIN
SELECT user_id FROM Usuario U WHERE U.email = email_ INTO id;
  IF FOUND THEN
      RETURN QUERY SELECT id;
  ELSE
      RETURN QUERY SELECT NULL::INTEGER as id;
  END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE trabajadorejerce(tid INTEGER, labor_ VARCHAR(255), tipo_trabajo VARCHAR(255), precio FLOAT, descripcion VARCHAR(255)) AS $$
    DECLARE lid INTEGER;
    DECLARE result RECORD;
  BEGIN
    FOR result IN SELECT labor_id FROM Ejerce WHERE trabajador_id = tid
    LOOP
      SELECT labor_id FROM Labor NATURAL JOIN Ejerce WHERE labor_id = result.labor_id AND labor = labor_::labor_tipo INTO lid;
      IF lid IS NOT NULL THEN
        raise notice 'Ya tiene ese labor';
        RETURN;
      END IF;
    END LOOP;
    SELECT labor_id FROM Labor WHERE labor_::labor_tipo = labor INTO lid;
    INSERT INTO Ejerce(trabajador_id,labor_id,tipo_trabajo,precio,descripcion) VALUES (tid,lid,tipo_trabajo::tipo_trabajo,precio,descripcion);
  END;
$$ LANGUAGE plpgsql;

--Verificar loguin de trabajador
CREATE OR REPLACE FUNCTION verificar_login_trabajador(user_id_ INTEGER) RETURNS TABLE (id INTEGER) AS $$
BEGIN
	  -- Consultar en la tabla Trabajador si el usuario encontrado en la tabla Usuario tiene un trabajador asociado
	SELECT trabajador_id FROM Trabajador WHERE user_id = user_id_ INTO id;
  IF FOUND THEN
      RETURN QUERY SELECT id;
  ELSE
      RETURN QUERY SELECT NULL::INTEGER as id;
  END IF;
END;
$$ LANGUAGE plpgsql;

--Verificar loguin de cliente
CREATE OR REPLACE FUNCTION verificar_login_cliente(user_id_ INTEGER) RETURNS TABLE (id INTEGER) AS $$
BEGIN
  -- Consultar en la tabla Cliente si el usuario encontrado en la tabla Usuario tiene un trabajador asociado
  SELECT cliente_id FROM Cliente WHERE user_id = user_id_ INTO id;
  IF FOUND THEN
    RETURN QUERY SELECT id;
  ELSE
    RETURN QUERY SELECT NULL::INTEGER as id;
  END IF;
END;
$$ LANGUAGE plpgsql;


--Verificar que una cuenta de trabajador este en uso
CREATE OR REPLACE FUNCTION verificar_cuenta_trabajador(numero_cuenta VARCHAR(255))
RETURNS TABLE (id INTEGER) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Trabajador WHERE cuenta = numero_cuenta) THEN
        RETURN QUERY SELECT trabajador_id FROM Trabajador WHERE cuenta = numero_cuenta;
    ELSE
        RETURN QUERY SELECT NULL::INTEGER as id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Verificar numero_cuenta Cliente
CREATE OR REPLACE FUNCTION verificar_cuenta_cliente(cuenta VARCHAR(255))
RETURNS TABLE (id INTEGER) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Cliente WHERE numero_cuenta = cuenta) THEN
        RETURN QUERY SELECT cliente_id FROM Cliente WHERE numero_cuenta = cuenta;
    ELSE
        RETURN QUERY SELECT NULL::INTEGER as id;
    END IF;
END;
$$ LANGUAGE plpgsql;


--Verificar que un celular este en uso
CREATE OR REPLACE FUNCTION verificar_celular(celular_ VARCHAR(255)) RETURNS TABLE (id INTEGER) AS $$
BEGIN
  -- Consultar en la tabla Usuario si existe un usuario con el número de celular dado
  SELECT user_id FROM Usuario WHERE celular = celular_ INTO id;
  -- Si existe al menos una fila con el número de celular dado, retornar true, en otro caso, false
  IF FOUND THEN
      RETURN QUERY SELECT id;
  ELSE
      RETURN QUERY SELECT NULL::INTEGER as id;
  END IF;
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

CREATE OR REPLACE PROCEDURE actualizar_calificacion(p_contrato_id INTEGER, p_calificacion INTEGER) AS $$
BEGIN
  UPDATE Contrato SET calificacion = p_calificacion WHERE contrato_id = p_contrato_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar la calificación promedio de un trabajador al agregar una calificación a un contrato:
CREATE OR REPLACE FUNCTION update_promedio_calificacion()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.calificacion IS NOT NULL) THEN
    UPDATE Trabajador SET calificacion = (SELECT AVG(calificacion) FROM Contrato WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_promedio_calificacion
AFTER UPDATE ON Contrato
FOR EACH ROW
EXECUTE FUNCTION update_promedio_calificacion();

--Un usuario solicita un servicio
CREATE EXTENSION postgis;
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;

--Trigger para notificacion
CREATE OR REPLACE FUNCTION enviar_notificacion()
RETURNS TRIGGER
AS
$BODY$
  DECLARE direccion_ VARCHAR(255);
  DECLARE labor_ VARCHAR(255);
  DECLARE asunto_ VARCHAR(255);
  DECLARE trabajador_id_ INTEGER;
BEGIN
  SELECT direccion INTO direccion_ FROM Coordenada WHERE coor_id = (SELECT coor_id FROM Usuario WHERE user_id = NEW.cliente_id);
  SELECT labor INTO labor_ FROM Labor WHERE labor_id = (SELECT labor_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id);
  SELECT (CASE
  WHEN NEW.fecha_f IS NULL THEN 'Contrato'
    ELSE 'Finalizacion'
  END) INTO asunto_;
  SELECT trabajador_id INTO trabajador_id_ FROM Ejerce WHERE ejerce_id = NEW.ejerce_id;

  INSERT INTO Notificacion (fecha, asunto, user_id, mensaje)
  VALUES (NOW(), asunto_::asunto_tipo,
  CASE asunto_
  WHEN 'Contrato' THEN trabajador_id_
  WHEN 'Finalizacion' THEN NEW.cliente_id
END,
  CASE asunto_
    WHEN 'Contrato' THEN 'Te informamos que el usuario '|| (SELECT nombre || ' ' || apellido FROM Usuario WHERE user_id = NEW.cliente_id) || ' te contrato para el labor de ' || labor_ || ' en la direccion ' || direccion_
    WHEN 'Finalizacion' THEN 'El trabajador ' || (SELECT nombre || ' ' || apellido FROM Usuario WHERE user_id = trabajador_id_) || ' ha finalizado el trabajo de ' || labor_ || ' en la direccion ' || direccion_
  END);
RETURN NULL;
END;
$BODY$
LANGUAGE plpgsql;


CREATE TRIGGER notificar_usuario
AFTER INSERT ON Contrato
FOR EACH ROW
EXECUTE FUNCTION enviar_notificacion();


CREATE OR REPLACE PROCEDURE actualizar_fecha_f(p_id INTEGER)
AS $$
BEGIN
  UPDATE Contrato SET fecha_f = NOW() WHERE contrato_id = p_id;
END;
$$ LANGUAGE plpgsql;

