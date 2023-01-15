CREATE TABLE Direccion (
    id SERIAL PRIMARY KEY,
    altitud VARCHAR(100) NOT NULL,
    latitud VARCHAR(100) NOT NULL
);

CREATE TABLE Medio_pago (
    id SERIAL PRIMARY KEY,
    numero_tarjeta VARCHAR(20) NOT NULL,
    codigo_seguridad INTEGER NOT NULL,
    tipo ENUM NOT NULL,
    fecha_expedicion DATE NOT NULL
);

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    celular VARCHAR(30) NOT NULL,
    url_recibo VARCHAR(300) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    id_direccion INTEGER REFERENCES Direccion(id),
    email VARCHAR(30) NOT NULL,
    id_medio_pago INTEGER REFERENCES Medio_pago(id),
    contrasena VARCHAR(100) NOT NULL
);

CREATE TABLE Trabajador (
    id SERIAL PRIMARY KEY,
    url_doc_identidad VARCHAR(300) NOT NULL,
    url_foto VARCHAR(300) NOT NULL,
    disponible BOOLEAN NOT NULL,
    celular VARCHAR(30) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    id_direccion INTEGER REFERENCES Direccion(id),
    email VARCHAR(20) NOT NULL,
    estrellas FLOAT NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);

CREATE TABLE Labor (
    actividad VARCHAR(30) NOT NULL,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Servicio (
    id SERIAL PRIMARY KEY,
    id_trabajador INTEGER REFERENCES Trabajador(id),
    id_labor INTEGER REFERENCES Labor(id),
    precio FLOAT NOT NULL,
    tipo ENUM NOT NULL,
    descripcion VARCHAR(300) NOT NULL
);

CREATE TABLE Contratacion (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES Usuario(id),
    id_servicio INTEGER REFERENCES Servicio(id),
    fecha DATE NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    estado BOOLEAN NOT NULL
);

CREATE TABLE Transaccion (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES Usuario(id),
    id_servicio INTEGER REFERENCES Servicio(id),
    fecha DATE NOT NULL,
    monto FLOAT NOT NULL
);

CREATE TABLE Calificacion (
    id SERIAL PRIMARY KEY,
    id_servicio INTEGER REFERENCES Servicio(id),
    id_usuario INTEGER REFERENCES Usuario(id),
    calificacion INTEGER NOT NULL
);

CREATE TABLE Notificacion (
    id SERIAL PRIMARY KEY,
    id_contratacion INTEGER REFERENCES Contratacion(id),
    mensaje VARCHAR(400) NOT NULL,
    fecha DATE NOT NULL,
    estado BOOLEAN NOT NULL
);
