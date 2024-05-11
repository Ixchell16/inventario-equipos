const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.mostrarTipo = async (req, res) => {
    conexion.query('SELECT * FROM tipoEquipo',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('jefe/tiposEquipos', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarMarca = async (req, res) => {
    conexion.query('SELECT * FROM marca',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('jefe/marca', { results: results, name: req.session.name });
        }   
    })
};


exports.mostrarLugar = async (req, res) => {
    conexion.query('SELECT * FROM lugar',(error, results)=>{
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('jefe/lugar', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarPersonal = async (req, res) => {
    conexion.query('SELECT * FROM personal',(error, results)=>{
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('jefe/personal', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarEquipos = async (req, res) => {
    conexion.query('SELECT e.*, m.marcaNombre, te.tipoEquipoNombre FROM equipos e INNER JOIN marca m ON e.marcaId = m.marcaId INNER JOIN tipoEquipo te ON e.tipoEquipoId = te.tipoEquipoId', (error, results) => {
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('errores/error');
        } else {                       
            res.render('jefe/equipos', { results: results, name: req.session.name });
        }   
    });
};

exports.mostrarAsignacion = async (req, res) => {
    conexion.query('SELECT * FROM asignarequipos',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('errores/error');
        } else {                       
            res.render('jefe/consultaAsignacion', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarBajas = async (req, res) => {
    conexion.query('SELECT * FROM asignarequipos',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('errores/error', { message: 'Error al consultar la base de datos' });
        } else {                       
            res.render('jefe/bajasEquipos', { results: results, name: req.session.name });
        }   
    })
};