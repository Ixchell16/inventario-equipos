const ejs = require('ejs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./routes/routes');
const config =require('./config.js')

const app = express();

app.use(session({
    secret: 'P0st3D3t3l3f0n0vi3j0@',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/resources', express.static('public'));
app.use(express.static('public'));

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar EJS para manejar las inclusiones de archivos
app.engine('ejs', ejs.renderFile);

// Rutas
app.use('/', routes);

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

const PORT = config.PORT

app.listen(PORT, () => {
   console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
