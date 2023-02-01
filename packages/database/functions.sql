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
    ) RETURNS TABLE(
    trabajador_id INTEGER
    ,nombre VARCHAR(255)
    ,apellido VARCHAR(255)
    ,ejerce_id INTEGER
    ,calificacion FLOAT
    ,precio FLOAT
    ,tipo_trabajo VARCHAR(255)
    , descripcion VARCHAR(255)
    , distancia FLOAT
    , criterio_ VARCHAR(255)) 
    AS $$
    BEGIN
      IF criterio = 'distancia' THEN
        RETURN QUERY
        SELECT 
        t.trabajador_id, 
        u.nombre, 
        u.apellido,
        e.ejerce_id,
        t.calificacion,
        e.precio,
        cast(e.tipo_trabajo as varchar), 
        e.descripcion, 
        earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia,
        criterio AS criterio_   
        FROM Ejerce e
        JOIN Trabajador t ON e.trabajador_id = t.trabajador_id
        JOIN Usuario u ON u.user_id = t.user_id
        JOIN Coordenada c ON c.coor_id = u.coor_id
        WHERE (e.labor_id = labor_id_in OR (labor_id_in = 0 OR labor_id_in IS NULL)) AND t.disponible = true
        ORDER BY distancia;
      ELSIF criterio = 'precio' THEN
        RETURN QUERY
        SELECT t.trabajador_id, u.nombre, u.apellido, e.ejerce_id, t.calificacion, e.precio, cast(e.tipo_trabajo as varchar), e.descripcion, earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia, criterio AS criterio_   
        FROM Ejerce e
        JOIN Trabajador t ON e.trabajador_id = t.trabajador_id
        JOIN Usuario u ON u.user_id = t.user_id
        JOIN Coordenada c ON c.coor_id = u.coor_id
        WHERE (e.labor_id = labor_id_in OR (labor_id_in = 0 OR labor_id_in IS NULL)) AND t.disponible = true
        ORDER BY precio;
      ELSIF criterio = 'calificacion' THEN
        RETURN QUERY
        SELECT t.trabajador_id, u.nombre, u.apellido, e.ejerce_id, t.calificacion, e.precio, cast(e.tipo_trabajo as varchar), e.descripcion, earth_distance(ll_to_earth(latitud_in, longitud_in), ll_to_earth(c.latitud, c.longitud)) AS distancia, criterio AS criterio_   
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
