CREATE DATABASE mande

CREATE TABLE Usuario (
    user_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    contrasena VARCHAR(255),
    coor_id INTEGER REFERENCES Coordenada(coor_id) 
);

CREATE TABLE Cliente (
    cliente_id SERIAL PRIMARY KEY,
    celular VARCHAR(255) UNIQUE,
    recibo VARCHAR(255),
    numero_cuenta INTEGER REFERENCES Medio_Pago(numero_cuenta) UNIQUE,
    user_id INTEGER REFERENCES Usuario(user_id) UNIQUE
);

CREATE TABLE Trabajador (
    trabajador_id SERIAL PRIMARY KEY,
    foto_perfil VARCHAR(255) UNIQUE,
    disponible BOOLEAN,
    calificacion INTEGER,
    doc_foto VARCHAR(255) UNIQUE,
    cuenta VARCHAR(255) UNIQUE,
    user_id INTEGER REFERENCES Usuario(user_id) UNIQUE
);

CREATE TABLE Coordenada (
    coor_id SERIAL PRIMARY KEY,
    latitud FLOAT,
    longitud FLOAT
);

CREATE TYPE medio_pago_tipo AS ENUM ('Debito', 'Credito');

CREATE TABLE Medio_Pago (
    numero_cuenta SERIAL PRIMARY KEY UNIQUE,
    tipo TYPE medio_pago_tipo
);

CREATE TABLE Labor (
    labor_id SERIAL PRIMARY KEY,
    labor VARCHAR(255)
);

CREATE TYPE asunto_tipo AS ENUM ('Contrato', 'Finalizacion');

CREATE TABLE Notificacion (
    notificacion_id SERIAL PRIMARY KEY,
    fecha DATE,
    mensaje VARCHAR(255),
    asunto TYPE asunto_type,
    user_id INTEGER REFERENCES Usuario(user_id)
);

CREATE TABLE Transaccion (
    transanccion_id SERIAL PRIMARY KEY,
    fecha DATE,
    monto FLOAT
);

CREATE TYPE tipo_trabajo AS ENUM ('precio_por_hora', 'unidad_de_trabajo');

CREATE TABLE Ejerce (
    ejerce_id SERIAL PRIMARY KEY,
    trabajador_id INTEGER REFERENCES Trabajador(trabajador_id),
    labor_id INTEGER REFERENCES Labor(labor_id),
    tipo_trabajo TYPE tipo_trabajo,
    precio FLOAT,
    descripcion VARCHAR(255)
);

CREATE TABLE Contrato (
    contrato_id SERIAL PRIMARY KEY,
    ejerce_id INTEGER REFERENCES Ejerce(ejerce_id),
    cliente_id INTEGER REFERENCES Cliente(cliente_id),
    calificacion INTEGER SET DEFAULT NULL,
    descripcion VARCHAR(255),
    fecha_i DATE,
    fecha_f DATE SET DEFAULT NULL,
    transaccion_id INTEGER REFERENCES Transaccion(transanccion_id) SET DEFAULT NULL
);



/*ADICIONALES*/

-- Actualiza automáticamente la disponibilidad del trabajador asociado a un contrato al momento de insertar una nueva fila en la tabla de contrato
CREATE TRIGGER actualizar_disponibilidad
AFTER INSERT ON Contrato
FOR EACH ROW
BEGIN
    UPDATE Trabajador SET disponible = false 
    WHERE trabajador_id = (SELECT trabajador_id FROM Ejerce WHERE ejerce_id = NEW.ejerce_id);
END;

-- Trigger para actualizar el estado de disponibilidad de un trabajador al finalizar un contrato
CREATE TRIGGER update_trabajador_disponibilidad
AFTER UPDATE ON Contrato
FOR EACH ROW
BEGIN
  IF (NEW.fecha_f IS NOT NULL) THEN
    UPDATE Trabajador SET disponible = true WHERE trabajador_id = NEW.trabajador_id;
  END IF;
END;

-- Crea una vista llamada "vista_trabajadores_habilidades" que presenta información de la tabla Trabajador y Ejerce agrupando las habilidades del trabajador.
CREATE VIEW vista_trabajadores_habilidades AS
SELECT Trabajador.trabajador_id, nombre, apellido, disponible, GROUP_CONCAT(labor) as habilidades
FROM Trabajador
JOIN Ejerce ON Trabajador.trabajador_id = Ejerce.trabajador_id
JOIN Labor ON Ejerce.labor_id = Labor.labor_id
GROUP BY Trabajador.trabajador_id;


-- Este procedimiento almacenado toma como parámetro el ID de un trabajador y utiliza una consulta para calcular la calificación promedio de ese trabajador a partir de las calificaciones en la tabla Contrato. Luego, actualiza la calificación en la tabla Trabajador y devuelve el promedio como resultado.
CREATE PROCEDURE calificacion_promedio(IN trabajador_id INT)
BEGIN
  DECLARE promedio FLOAT;
  SET promedio = (SELECT AVG(calificacion) FROM Contrato WHERE trabajador_id = trabajador_id);
  UPDATE Trabajador SET calificacion = promedio WHERE trabajador_id = trabajador_id;
  SELECT promedio;
END;

-- Trigger para actualizar la calificación promedio de un trabajador al agregar una calificación a un contrato:
CREATE TRIGGER update_trabajador_calificacion
AFTER INSERT ON Contrato
FOR EACH ROW
BEGIN
  CALL calificacion_promedio(NEW.trabajador_id);
END;

-- Vista para mostrar información de los contratos de un cliente
CREATE VIEW contratos_cliente AS
SELECT contrato_id, ejerce.labor_id, labor, fecha_i, fecha_f, calificacion
FROM Contrato 
JOIN Ejerce ON Contrato.ejerce_id = Ejerce.ejerce_id
JOIN Labor ON Ejerce.labor_id = Labor.labor_id

-- Funcion para calcular la distancia entre dos coordenadas geograficas.
CREATE FUNCTION distancia_coordenadas(latitud1 FLOAT, longitud1 FLOAT, latitud2 FLOAT, longitud2 FLOAT)
RETURNS FLOAT
BEGIN
  DECLARE distancia FLOAT;
  SET distancia = 6371 * acos(cos(radians(latitud1)) * cos(radians(latitud2)) * cos(radians(longitud2) - radians(longitud1)) + sin(radians(latitud1)) * sin(radians(latitud2)));
  RETURN distancia;
END;

