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


--Verificar login de trabajador
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


--Verificar login de cliente
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
CREATE OR REPLACE FUNCTION verificar_celular(celular_ VARCHAR(255)) 
RETURNS TABLE (id INTEGER) AS $$
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


-- Tabla con los servicios disponibles segun criterio.
CREATE OR REPLACE FUNCTION buscar_trabajadores(labor_id_in INT, latitud_in FLOAT, longitud_in FLOAT,criterio VARCHAR(255)
) RETURNS TABLE(trabajador_id INTEGER,nombre VARCHAR(255),apellido VARCHAR(255),ejerce_id INTEGER,calificacion FLOAT,precio FLOAT,tipo_trabajo VARCHAR(255), descripcion VARCHAR(255), distancia FLOAT) 
AS $$
BEGIN
  IF criterio = 'distancia' THEN
    RETURN QUERY
    SELECT t.trabajador_id, u.nombre, u.apellido, e.ejerce_id, t.calificacion, e.precio, cast(e.tipo_trabajo as varchar), e.descripcion, earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia
    FROM Ejerce e
    JOIN Trabajador t ON e.trabajador_id = t.trabajador_id
    JOIN Usuario u ON u.user_id = t.user_id
    JOIN Coordenada c ON c.coor_id = u.coor_id
    WHERE (e.labor_id = labor_id_in OR (labor_id_in = 0 OR labor_id_in IS NULL)) AND t.disponible = true
    ORDER BY distancia;
  ELSIF criterio = 'precio' THEN
    RETURN QUERY
    SELECT t.trabajador_id, u.nombre, u.apellido, e.ejerce_id, t.calificacion, e.precio, cast(e.tipo_trabajo as varchar), e.descripcion, earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia
    FROM Ejerce e
    JOIN Trabajador t ON e.trabajador_id = t.trabajador_id
    JOIN Usuario u ON u.user_id = t.user_id
    JOIN Coordenada c ON c.coor_id = u.coor_id
    WHERE (e.labor_id = labor_id_in OR (labor_id_in = 0 OR labor_id_in IS NULL)) AND t.disponible = true
    ORDER BY precio;
  ELSIF criterio = 'calificacion' THEN
    RETURN QUERY
    SELECT t.trabajador_id, u.nombre, u.apellido, e.ejerce_id, t.calificacion, e.precio, cast(e.tipo_trabajo as varchar), e.descripcion, earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia
    FROM Ejerce e
    JOIN Trabajador t ON e.trabajador_id = t.trabajador_id
    JOIN Usuario u ON u.user_id = t.user_id
    JOIN Coordenada c ON c.coor_id = u.coor_id
    WHERE (e.labor_id = labor_id_in OR (labor_id_in = 0 OR labor_id_in IS NULL)) AND t.disponible = true
    ORDER BY calificacion;
  ELSE RAISE NOTICE 'criterio no exite';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Tabla con informacion de los contratos que tiene el trabajador 
CREATE OR REPLACE FUNCTION infoContratoTrabajador(p_trabajador_id INTEGER)
RETURNS TABLE(contrato_id INTEGER, ejerce_id INTEGER, cliente_id INTEGER, calificacion FLOAT, descripcion VARCHAR(255), fecha_i DATE, fecha_f DATE, transaccion_id INTEGER, nombre_cliente VARCHAR(255), nombre_labor VARCHAR(255), is_pagado BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  SELECT contrato.contrato_id, contrato.ejerce_id, contrato.cliente_id, contrato.calificacion, contrato.descripcion, contrato.fecha_i, contrato.fecha_f, contrato.transaccion_id ,
  CONCAT(usuario.nombre,' ',usuario.apellido)::varchar AS nombre_cliente, (labor.labor )::varchar AS nombre_labor, transaccion.monto IS NOT NULL AS is_pagado
  FROM Contrato contrato
  JOIN Ejerce ejerce ON contrato.ejerce_id = ejerce.ejerce_id
  JOIN Cliente cliente ON contrato.cliente_id = cliente.cliente_id
  JOIN Trabajador trabajador ON ejerce.trabajador_id = trabajador.trabajador_id
  JOIN Labor labor ON ejerce.labor_id = labor.labor_id
-- Join a transaccion para ver si esta pagado
  JOIN Transaccion transaccion ON contrato.transaccion_id = transaccion.transaccion_id
  JOIN Usuario usuario ON cliente.user_id = usuario.user_id
  WHERE trabajador.trabajador_id = p_trabajador_id;
END;
$$ LANGUAGE plpgsql;


-- Historial de pagos para trabajador
  CREATE OR REPLACE FUNCTION obtener_informacion_transacciones_trabajador(p_trabajador_id INTEGER)
  RETURNS TABLE (fecha_transaccion DATE, monto_transaccion FLOAT, cuenta_enviada VARCHAR(255), cuentarecibida VARCHAR(255), labor VARCHAR(255)) AS $$
  BEGIN
    RETURN QUERY 
    SELECT 
      trans.fecha AS fecha_transaccion,
      trans.monto AS monto_transaccion,
      trab.cuenta AS cuenta_enviada,
      cli.numero_cuenta AS cuentarecibida,
      lab.labor::varchar AS labor
    FROM 
      Transaccion trans
      INNER JOIN Trabajador trab ON trans.transaccion_id = trab.trabajador_id
      INNER JOIN Cliente cli ON trans.transaccion_id = cli.cliente_id
      INNER JOIN Ejerce ejer ON trans.transaccion_id = ejer.ejerce_id
      INNER JOIN Labor lab ON ejer.labor_id = lab.labor_id
    WHERE 
      trab.trabajador_id = p_trabajador_id
    AND trans.fecha IS NOT NULL;
  END;
  $$ LANGUAGE plpgsql;


  -- notificaciones para trabajador
CREATE OR REPLACE FUNCTION obtener_notificaciones_trabajador(p_trabajador_id INTEGER)
RETURNS TABLE (notificacion_id INTEGER, fecha DATE, mensaje VARCHAR(255), asunto VARCHAR(255)) AS $$
BEGIN
  RETURN QUERY
  SELECT notificacion.notificacion_id, notificacion.fecha, notificacion.mensaje, notificacion.asunto::varchar
  -- tenemos en cuenta que la notificacion esta asociada a un usuario, es decir tiene user_id y no trabajador_id
  FROM Notificacion notificacion
  JOIN Usuario usuario ON notificacion.user_id = usuario.user_id
  JOIN Trabajador trabajador ON usuario.user_id = trabajador.user_id
  WHERE trabajador.trabajador_id = p_trabajador_id;
END;
$$ LANGUAGE plpgsql;