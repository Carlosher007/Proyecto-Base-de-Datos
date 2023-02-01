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

-- Calificar un servicio
CREATE OR REPLACE PROCEDURE calificarServicio(p_contrato_id INTEGER, p_calificacion FLOAT) AS $$
BEGIN
  UPDATE Contrato SET calificacion = p_calificacion WHERE contrato_id = p_contrato_id;
END;
$$ LANGUAGE plpgsql;

-- fecha de finalizacion de un contrato.
CREATE OR REPLACE PROCEDURE finalizarContrato(cid INTEGER)
AS $$
BEGIN
  UPDATE Contrato SET fecha_f = NOW() WHERE contrato_id = cid;
END;
$$ LANGUAGE plpgsql;


-- realizar pago
CREATE OR REPLACE PROCEDURE realizarPago(cid INTEGER) AS $$
    BEGIN
        UPDATE Transaccion SET fecha = NOW() FROM  Contrato WHERE Contrato.transaccion_id = Transaccion.transaccion_id AND Contrato.contrato_id = cid;    
    END;
$$ LANGUAGE plpgsql;