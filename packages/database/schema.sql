--Extensiones requeridas
CREATE EXTENSION postgis;
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;

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
    transaccion_id SERIAL PRIMARY KEY,
    fecha DATE,
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
    cantidad_trabajo INTEGER NOT NULL,
    calificacion FLOAT ,
    descripcion VARCHAR(255),
    fecha_i DATE NOT NULL,
    fecha_f DATE,
    transaccion_id INTEGER UNIQUE REFERENCES Transaccion(transaccion_id) 
);
