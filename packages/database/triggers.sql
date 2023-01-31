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
    UPDATE Trabajador SET calificacion = (SELECT AVG(calificacion) FROM Contrato WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_promedio_calificacion
AFTER UPDATE ON Contrato
FOR EACH ROW
EXECUTE FUNCTION update_promedio_calificacion();


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
