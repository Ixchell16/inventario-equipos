//mostrarController.js

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
    conexion.query('SELECT e.*, m.marcaNombre, te.tipoEquipoNombre, es.estadoNombre FROM equipos e INNER JOIN marca m ON e.marcaId = m.marcaId INNER JOIN tipoEquipo te ON e.tipoEquipoId = te.tipoEquipoId INNER JOIN estado es ON e.estadoId = es.estadoId WHERE e.estadoId = 1', (error, results) => {
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('errores/error');
        } else {                       
            res.render('jefe/equipos', { results: results, name: req.session.name });
        }   
    });
};

exports.mostrarBajas = async (req, res) => {
    conexion.query('SELECT e.*, m.marcaNombre, es.estadoNombre, te.tipoEquipoNombre FROM equipos e INNER JOIN marca m ON e.marcaId = m.marcaId INNER JOIN tipoEquipo te ON e.tipoEquipoId = te.tipoEquipoId INNER JOIN estado es ON e.estadoId = es.estadoId WHERE e.estadoId = 2',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('errores/error', { message: 'Error al consultar la base de datos' });
        } else {                       
            res.render('jefe/bajasEquipos', { results: results, name: req.session.name });
        }   
    })
};


exports.mostrarAsignacion = async (req, res) => {
    user = req.session.name
    try{
        conexion.query('SELECT ae.asignarEquiposId, es.estadoNombre, ae.equiposFolio, e.equiposSerie, te.tipoEquipoNombre AS tipoEquipoNombre, e.equiposmodelo AS equiposmodelo, m.marcaNombre AS marcaNombre, e.equiposRam AS equiposRam, e.equiposVelocidad AS equiposVelocidad, e.equiposDiscoDuro AS equiposDiscoDuro, p.personalNombre AS personalNombre, p.personalId AS personalId, u.usuarioNombre AS usuarioNombre, l.lugarSiglas, l.lugarEdificios, l.lugarId AS lugarId, es.estadoId AS estadoId ,ae.asignarEquiposFecha, es.estadoNombre AS estadoNombre FROM asignarEquipos ae JOIN equipos e ON ae.equiposFolio = e.equiposFolio JOIN tipoEquipo te ON e.tipoEquipoId = te.tipoEquipoId JOIN marca m ON e.marcaId = m.marcaId JOIN personal p ON ae.personalId = p.personalId JOIN usuarios u ON ae.usuarioId = u.usuarioId JOIN lugar l ON ae.lugarId = l.lugarId JOIN estado es ON ae.estadoId = es.estadoId WHERE u.usuarioNombre = ? AND ae.estadoId = 3', [user],(error, results)=>{
            if(error){
                console.log('Error al consultar la base de datos:', error);
                res.render('errores/error');
            } else {                      
                res.render('jefe/consultaAsignacion', { results: results, name: req.session.name });
            }   
        })
    }catch (error){
        console.log('Error al actualizar al equipo:', error);
    }
};

exports.mostrarBodega = async (req, res) => {
    user = req.session.name
    try{
        conexion.query('SELECT bd.bodegaDesmontajeId, es.estadoNombre, bd.equiposFolio, e.equiposSerie, te.tipoEquipoNombre AS tipoEquipoNombre, e.equiposmodelo AS equiposmodelo, m.marcaNombre AS marcaNombre, e.equiposRam AS equiposRam, e.equiposVelocidad AS equiposVelocidad, e.equiposDiscoDuro AS equiposDiscoDuro, u.usuarioNombre AS usuarioNombre, es.estadoId AS estadoId , es.estadoNombre AS estadoNombre, bd.bodegaDesmontajeFecha FROM bodegaDesmontaje bd JOIN equipos e ON bd.equiposFolio = e.equiposFolio JOIN tipoEquipo te ON e.tipoEquipoId = te.tipoEquipoId JOIN marca m ON e.marcaId = m.marcaId JOIN usuarios u ON bd.usuarioId = u.usuarioId JOIN estado es ON bd.estadoId = es.estadoId WHERE u.usuarioNombre = ? AND bd.estadoId = 4', [user],(error, results)=>{
            if(error){
                console.log('Error al consultar la base de datos:', error);
                res.render('errores/error');
            } else {                      
                res.render('jefe/bodegaDesmontaje', { results: results, name: req.session.name });
            }   
        })
    }catch (error){
        console.log('Error al actualizar la bodega:', error);
    }
};