// routes/routes.js

const express = require('express');
const router = express.Router();
// Importar el controlador o middleware para el cierre de sesión
const logoutUser = require('../middlewares/autload');

// Ruta para cerrar sesión
router.get('/logout', logoutUser);

const loginController = require('../controllers/loginController');
const autenticacionMiddleware = require('../middlewares/AutentificacionMiddlewares');
const autorizacionMiddleware = require('../middlewares/AutorizacionMidleware');
const queries =require('../database/queries')

const registroControllerJ = require('../controllers/registroControllerJ');
const mostrarControllerJ = require('../controllers/mostrarControllerJ');
const deleteControllerJ = require('../controllers/deleteControllerJ');
const editControllerJ = require('../controllers/editControllerJ');

const registroControllerS = require('../controllers/registroControllerS');
const mostrarControllerS = require('../controllers/mostrarControllerS');
const deleteControllerS = require('../controllers/deleteControllerS');
const editControllerS = require('../controllers/editControllerS')

router.get('/asignacionJ', autenticacionMiddleware, autorizacionMiddleware(1), (req, res) => {
    res.render('jefe/asignacionEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/asignacionJ', autenticacionMiddleware, autorizacionMiddleware(1), registroControllerJ.registrarAsignacion, (req, res) => {
    res.render('jefe/asignacionEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/asignacion/folio', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerEquiposFolio, (req, res) => {
    res.json(resultados);
});

router.get('/asignacion/equipo/:folio', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerEquipos);

router.get('/asignacion/personal', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerPersonal, (req, res) => {
    res.json(resultados);
});

router.get('/asignacion/lugar', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerLugarId, (req, res) => {
    res.json(resultados);
});

router.get('/asignacion/lugar/:id', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerLugar);

// Ruta para mostrar los tipos de Equipos
router.get('/consultaAsignacion', autenticacionMiddleware, autorizacionMiddleware(1),mostrarControllerJ.mostrarAsignacion, (req, res) => {
    res.render('jefe/consultaAsignacion', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
}); 
router.get('/deleteAsignacion/:id', deleteControllerJ.deleteAsignacion);

router.post('/updateAsignacion/:id', editControllerJ.updateAsignacion);

// Ruta para mostrar los tipos de Equipos
router.get('/consultaAsigacionS', autenticacionMiddleware, autorizacionMiddleware(2),mostrarControllerS.mostrarAsignacion, (req, res) => {
    res.render('supervisor/consultaAsignacion', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/asignacionS', autenticacionMiddleware, autorizacionMiddleware(2), (req, res) => {
    res.render('supervisor/asignacionEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/asignacionS', autenticacionMiddleware, autorizacionMiddleware(2), registroControllerS.registrarAsignacion, (req, res) => {
    res.render('supervisor/asignacionEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/asignacionS/folio', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerEquiposFolioS, (req, res) => {
    res.json(resultados);
});

router.get('/asignacionS/equipo/:folio', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerEquipos);

router.get('/asignacionS/personal', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerPersonal, (req, res) => {
    res.json(resultados);
});

router.get('/asignacionS/lugar', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerLugarId, (req, res) => {
    res.json(resultados);
});

router.get('/asignacionS/lugar/:id', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerLugar);

router.post('/updateAsignacionS/:id', editControllerS.updateAsignacion);

router.get('/bajasAsiganacion', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarBajas, (req, res) => {
    res.render('jefe/bajasEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/bajasAsiganacionS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarBajas, (req, res) => {
    res.render('supervisor/bajasEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/bodegaS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarBodega);

router.post('/bodegaS', autenticacionMiddleware, autorizacionMiddleware(2), registroControllerS.registrarBodega);

router.get('/altaEquipos/:id', registroControllerJ.altaEquipos);

router.get('/bodegaJ', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarBodega);

router.post('/bodegaJ', autenticacionMiddleware, autorizacionMiddleware(1), registroControllerJ.registrarBodega);

router.get('/asignacionJ/folio', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerEquiposFolioJ, (req, res) => {
    res.json(resultados);
});

// Ruta para mostrar los tipos de Equipos
router.get('/tiposEquiposJ', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarTipo, (req, res) => {
    res.render('jefe/tiposEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/tiposEquiposJ', autenticacionMiddleware, autorizacionMiddleware(1), registroControllerJ.registrarTipo, (req, res) => {
    res.render('jefe/tiposEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

// Ruta para mostrar los lugares
router.get('/lugarJ', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarLugar, (req, res) => {
    res.render('jefe/lugar', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/lugarJ', autenticacionMiddleware, autorizacionMiddleware(1),registroControllerJ.registrarLugar, (req, res) => {
    res.render('jefe/lugar', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/marcaJ', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarMarca, queries.obtenerMarcas,(req, res) => {
    res.render('jefe/marca', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/marcaJ', autenticacionMiddleware, autorizacionMiddleware(1),registroControllerJ.registrarMarca, (req, res) => {
    res.render('jefe/marca', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/personalJ', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarPersonal, (req, res) => {
    res.render('jefe/personal', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/personalJ', autenticacionMiddleware, autorizacionMiddleware(1),registroControllerJ.registrarPersonal, (req, res) => {
    res.render('jefe/personal', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/equiposJ', autenticacionMiddleware, autorizacionMiddleware(1), mostrarControllerJ.mostrarEquipos);

router.post('/equiposJ', autenticacionMiddleware, autorizacionMiddleware(1),registroControllerJ.registrarEquipos);

router.get('/equiposJ/marcas', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerMarcas, (req, res) => {
    res.json(resultados);
});
router.get('/equiposJ/tipo', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerTipo, (req, res) => {
    res.json(resultados);
});

router.get('/equiposJ/marcasM', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerMarcasM, (req, res) => {
    res.json(resultados);
});
router.get('/equiposJ/tipoM', autenticacionMiddleware, autorizacionMiddleware(1), queries.obtenerTipoM, (req, res) => {
    res.json(resultados);
});


//Ruta para eliminar y editar tipos de equipos
router.get('/deleteTipo/:id', deleteControllerJ.deleteTipo);

router.post('/updateTipo/:id', editControllerJ.updateTipo);


//Ruta para eliminar y editar marcas
router.get('/deleteMarca/:id', deleteControllerJ.deleteMarca);

router.post('/updateMarca/:id', editControllerJ.updateMarca);


//Ruta para eliminar y editar lugar
router.get('/deleteLugar/:id', deleteControllerJ.deleteLugar);

router.post('/updateLugar/:id', editControllerJ.updateLugar);


//Ruta para eliminar y editar personal
router.get('/deletePersonal/:id', deleteControllerJ.deletePersonal);

router.post('/updatePersonal/:id', editControllerJ.updatePersonal);


//Ruta para eliminar y editar personal
router.get('/bajaEquipos/:id', deleteControllerJ.bajaEquipos);

router.post('/updateEquipos/:folio', editControllerJ.updateEquipos);

// Ruta para registrar un usuario (POST)
router.post('/userS', autenticacionMiddleware, autorizacionMiddleware(2), registroControllerS.registrarUsuario, (req, res) => {
    res.render('supervisor/registros', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/userS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarRol, (req, res) => {
    res.render('supervisor/registros', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/consultarUsers', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarUser, (req, res) => {
    res.render('supervisor/registros', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

// Ruta para mostrar los tipos de Equipos
router.get('/tiposEquiposS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarTipo, (req, res) => {
    res.render('supervisor/tiposEquipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/lugarS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarLugar, (req, res) => {
    res.render('supervisor/lugar', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/marcaS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarMarca, queries.obtenerMarcas,(req, res) => {
    res.render('supervisor/marca', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/personalS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarPersonal, (req, res) => {
    res.render('supervisor/personal', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/equiposS', autenticacionMiddleware, autorizacionMiddleware(2), mostrarControllerS.mostrarEquipos, (req, res) => {
    res.render('supervisor/equipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.post('/equiposS', autenticacionMiddleware, autorizacionMiddleware(2), registroControllerS.registrarEquipos, (req, res) => {
    res.render('supervisor/equipos', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});


router.get('/equiposS/marcas', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerMarcas, (req, res) => {
    res.json(resultados);
});
router.get('/equiposS/tipo', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerTipo, (req, res) => {
    res.json(resultados);
});

router.get('/equiposS/marcasM', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerMarcasM, (req, res) => {
    res.json(resultados);
});
router.get('/equiposS/tipoM', autenticacionMiddleware, autorizacionMiddleware(2), queries.obtenerTipoM, (req, res) => {
    res.json(resultados);
});

//Ruta para eliminar y editar personal
router.get('/deleteUsers/:id',deleteControllerS.deleteUsers);

router.post('/updateUsers/:id', editControllerS.updateUser);


//Ruta para eliminar y editar tipos de equipos
router.get('/deleteTipoS/:id', deleteControllerS.deleteTipo);

router.post('/updateTipoS/:id', editControllerS.updateTipo);

router.post('/insertarTipo', registroControllerS.registrarTipo);


//Ruta para eliminar y editar marcas
router.get('/deleteMarcaS/:id', deleteControllerS.deleteMarca);

router.post('/updateMarcaS/:id', editControllerS.updateMarca);

router.post('/insertarMarca', registroControllerS.registrarMarca);


//Ruta para eliminar y editar lugar
router.get('/deleteLugarS/:id', deleteControllerS.deleteLugar);

router.post('/updateLugarS/:id', editControllerS.updateLugar);

router.post('/insertarLugar', registroControllerS.registrarLugar);


//Ruta para eliminar y editar personal
router.get('/deletePersonalS/:id', deleteControllerS.deletePersonal);

router.post('/updatePersonalS/:id', editControllerS.updatePersonal);

router.post('/insertarPersonal', registroControllerS.registrarPersonal);


//Ruta para eliminar y editar personal
router.get('/bajaEquiposS/:id', deleteControllerS.bajaEquipos);

router.post('/updateEquiposS/:folio', editControllerS.updateEquipos);

router.post('/insertarEquiposS', registroControllerS.registrarEquipos);

// Ruta protegida para el index del jefe (requiere autenticación y rol de jefe)
router.get('/indexJ', autenticacionMiddleware, autorizacionMiddleware(1), (req, res) => {
    res.render('jefe/index', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

router.get('/indexS', autenticacionMiddleware, autorizacionMiddleware(2), (req, res) => {
    res.render('supervisor/index', {
        login: true,
        name: req.user.name,
        rol: req.user.rol
    });
});

// Ruta para autenticar un usuario (POST)
router.post('/login', loginController.autenticarUsuario);

// Controlador para iniciar sesión
router.get('/login',(req, res)=>{
    res.render('login');
})

router.get('/', (req, res) => {
    res.redirect('/login');
});

//rutas de errores
router.get('/error',(req, res)=>{
    res.render('errores/error');
})
router.get('/errorCaducidad',(req, res)=>{
    res.render('errores/errorCaducidad');
})
router.get('/errorAcceso',(req, res)=>{
    res.render('errores/errorAcceso');
})



module.exports = router;