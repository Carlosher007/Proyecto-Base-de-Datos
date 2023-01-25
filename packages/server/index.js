/** @format */

const express = require('express');
const { Server } = require('socket.io');
const app = express();
const helmet = require('helmet'); // es un paquete de seguridad que agrega varios encabezados HTTP de seguridad a las respuestas del servidor para proteger contra ataques comunes.
const cors = require('cors'); //es un middleware que permite que el servidor acepte solicitudes desde dominios diferentes. En este caso, está configurado para aceptar solicitudes desde "http://localhost:3000" y habilitando las credenciales.
const session = require("express-session")
const authRouter = require('./routes/authRouter'); //este es un enrutador personalizado para manejar las solicitudes relacionadas con la autenticación.
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks.routes');
require('dotenv').config();

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://frontend:3000',
    credentials: true,
  },
}); // es una instancia de socket.io, que es una biblioteca que permite la comunicación en tiempo real entre el cliente y el servidor.

app.use(helmet());

app.use(cors({
  origin: "http://frontend:3000",
  credentials: true, 
})); 

app.use(morgan('dev'));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === 'production',
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    },
  })
);

app.use("/auth", authRouter);
app.use(taskRoutes);

app.get('/', (req, res) => {
  res.json('hi');
});

io.on('connect', (socket) => {});

server.listen(8000, () => {
  console.log('listening on port :8000');
});
