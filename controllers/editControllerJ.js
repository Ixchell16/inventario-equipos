//editController.js

const conexion = require('../database/db');

exports.updateTipo = async (req, res) => {

    const { nombre, tipoid } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        conexion.query('UPDATE tipoEquipo SET tipoEquipoNombre = ? WHERE tipoEquipoId = ?', [nombre, tipoid], (error, results) => {
            if (error) {
                console.log('Error al actualizar el tipo de equipo:', error);
                res.render('errores/error');
            } else {
                // Redirigir a la página de tipos de equipos después de la actualización
                res.redirect('/tiposEquiposJ');
            }
        });
    } catch (error) {
        console.log('Error al actualizar el tipo de equipo:', error);
        res.render('errores/error');
    }
};

exports.updateMarca = async (req, res) => {

    const { nombre, marcaid } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        conexion.query('UPDATE marca SET marcaNombre = ? WHERE marcaId = ?', [nombre, marcaid], (error, results) => {
            if (error) {
                console.log('Error al actualizar el tipo de equipo:', error);
                res.render('errores/error');
            } else {
                // Redirigir a la página de tipos de equipos después de la actualización
                res.redirect('/marcaJ');
            }
        });
    } catch (error) {
        console.log('Error al actualizar la marca:', error);
        res.render('errores/error');
    }
};

exports.updateLugar = async (req, res) => {
    const {lugarid, siglas, edificios } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        conexion.query('UPDATE lugar SET lugarSiglas = ?, lugarEdificios = ? WHERE lugarId = ?', [siglas, edificios, lugarid], (error, results) => {
            if (error) {
                console.log('Error al actualizar el lugar:', error);
                res.render('errores/error');
            } else {
                // Redirigir a la página de tipos de equipos después de la actualización
                res.redirect('/lugarJ');
            }
        });
    } catch (error) {
        console.log('Error al actualizar el lugar:', error);
        res.render('errores/error');
    }
};

exports.updatePersonal = async (req, res) => {
    const {personalid, nombre, numero, puesto } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        conexion.query('UPDATE personal SET personalNombre = ?, personalNumero = ?, personalPuesto = ? WHERE personalId = ?', [nombre, numero, puesto, personalid], (error, results) => {
            if (error) {
                console.log('Error al actualizar al personal:', error);
                res.render('errores/error');
            } else {
                // Redirigir a la página de tipos de equipos después de la actualización
                res.redirect('/personalJ');
            }
        });
    } catch (error) {
        console.log('Error al actualizar al personal:', error);
        res.render('errores/error');
    }
};

exports.updateEquipos = async (req, res) => {
    const {folio, serie, marcaM, tipoM, modelo, ram, velocidad, disco } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        conexion.query('UPDATE equipos SET equiposSerie = ?, marcaId = ?, tipoEquipoId = ?, equiposmodelo = ?, equiposRAM = ?, equiposVelocidad = ?, equiposDiscoDuro = ? WHERE equiposFolio = ?',
        [serie, marcaM, tipoM, modelo, ram, velocidad, disco, folio], (error, results) => {
            if (error) {
                console.log('Error al actualizar al equipo:', error);
                res.render('errores/error');
            } else {
                // Redirigir a la página de tipos de equipos después de la actualización
                res.redirect('/equiposS');
            }
        });
    } catch (error) {
        console.log('Error al actualizar al equipo:', error);
        res.render('errores/error');
    }
};