  CREATE VIEW infoContratoT AS 
    SELECT C.contrato_id, C.ejerce_id, C.cliente_id, Tr.trabajador_id, C.calificacion, C.descripcion, C.fecha_i, C.fecha_f, C.transaccion_id ,
    CONCAT(usuario.nombre,' ',usuario.apellido)::varchar AS nombre_cliente, (L.labor )::varchar AS nombre_labor, transaccion.fecha IS NOT NULL AS is_pagado, transaccion.monto
    FROM Contrato C
    JOIN Ejerce E ON C.ejerce_id = E.ejerce_id
    JOIN Cliente Cli ON C.cliente_id = Cli.cliente_id
    JOIN Trabajador Tr ON E.trabajador_id = Tr.trabajador_id
    JOIN Labor L ON E.labor_id = L.labor_id
    -- Join a transaccion para ver si esta pagado
    JOIN Transaccion transaccion ON C.transaccion_id = transaccion.transaccion_id
    JOIN Usuario usuario ON Cli.user_id = usuario.user_id
  ;

CREATE VIEW infoTransaccionT AS
  SELECT 
      Tr.trabajador_id,
      T.fecha AS fecha_transaccion,
      T.monto AS monto_transaccion,
      Tr.cuenta AS cuenta_recibio,
      Cli.numero_cuenta AS cuenta_envio,
      L.labor::varchar AS labor_
    FROM Contrato C
  JOIN Ejerce E ON C.ejerce_id = E.ejerce_id
  JOIN Cliente Cli ON C.cliente_id = Cli.cliente_id
  JOIN Trabajador Tr ON E.trabajador_id = Tr.trabajador_id
  JOIN Labor L ON E.labor_id = L.labor_id
  JOIN Transaccion T ON C.transaccion_id = T.transaccion_id
  WHERE T.fecha IS NOT NULL
;

CREATE VIEW notificacionesT AS
  SELECT Tr.trabajador_id, N.notificacion_id, N.fecha, N.mensaje, N.asunto::varchar
  -- tenemos en cuenta que la notificacion esta asociada a un usuario, es decir tiene user_id y no trabajador_id
  FROM Notificacion N
  JOIN Usuario U ON N.user_id = U.user_id
  JOIN Trabajador Tr ON U.user_id = Tr.user_id
;

CREATE VIEW infoContratoC AS
  SELECT C.contrato_id, Cli.cliente_id ,C.ejerce_id, C.calificacion, C.descripcion, C.fecha_i, C.fecha_f, C.transaccion_id ,
  CONCAT(usuario.nombre,' ',usuario.apellido)::varchar AS nombre_trabajador, (L.labor )::varchar AS nombre_labor, transaccion.fecha IS NOT NULL AS is_pagado, transaccion.monto
  FROM Contrato C
  JOIN Ejerce E ON C.ejerce_id = E.ejerce_id
  JOIN Cliente Cli ON C.cliente_id = Cli.cliente_id
  JOIN Trabajador Tr ON E.trabajador_id = Tr.trabajador_id
  JOIN Labor L ON E.labor_id = L.labor_id
  -- Join a transaccion para ver si esta pagado
  JOIN Transaccion transaccion ON C.transaccion_id = transaccion.transaccion_id
  JOIN Usuario usuario ON Tr.user_id = usuario.user_id
;

CREATE VIEW infoTransaccionC AS
  SELECT 
    C.cliente_id, T.fecha AS fecha_transaccion,
    T.monto AS monto_transaccion,
    Tr.cuenta AS cuenta_recibio,
    C.numero_cuenta AS cuenta_envio,
    L.labor::varchar AS labor_
    FROM Contrato contrato
  JOIN Ejerce E ON contrato.ejerce_id = E.ejerce_id
  JOIN Cliente C ON contrato.cliente_id = C.cliente_id
  JOIN Trabajador Tr ON E.trabajador_id = Tr.trabajador_id
  JOIN Labor L ON E.labor_id = L.labor_id
  JOIN Transaccion T ON contrato.transaccion_id = T.transaccion_id
  WHERE T.fecha IS NOT NULL
;

CREATE VIEW notificacionesC AS
  SELECT C.cliente_id, N.notificacion_id, N.fecha, N.mensaje, N.asunto::varchar
  -- tenemos en cuenta que la notificacion esta asociada a un usuario, es decir tiene user_id y no trabajador_id
  FROM Notificacion N
  JOIN Usuario U ON N.user_id = U.user_id
  JOIN Cliente C ON U.user_id = C.user_id
;