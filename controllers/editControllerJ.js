//editController.js

const conexion = require('../database/db');

exports.updateTipo = async (req, res) => {

    const { nombre, tipoid } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        conexion.query('UPDATE tipoequipo SET tipoEquipoNombre = ? WHERE tipoEquipoId = ?', [nombre, tipoid], (error, results) => {
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
    const { folio, serie, marcaM, tipoM, modelo, ram, velocidad, disco, estado } = req.body;
    const userName = req.session.name;

    try {
        // Obtener el usuarioId a partir del nombre de usuario de la sesión
        conexion.query('SELECT usuarioId FROM usuarios WHERE usuarioNombre = ?', [userName], (error, userResults) => {
            if (error) {
                console.log('Error al obtener el usuario:', error);
                return res.status(500).send({ message: 'Hubo un error al obtener el usuario.' });
            }
            
            if (userResults.length === 0) {
                return res.status(400).send({ message: 'Usuario no encontrado' });
            }
            
            const usuarioId = userResults[0].usuarioId;

            // Ejecutar consulta SQL para actualizar el equipo en la base de datos
            conexion.query(
                'UPDATE equipos SET equiposSerie = ?, marcaId = ?, tipoEquipoId = ?, equiposmodelo = ?, equiposRAM = ?, equiposVelocidad = ?, equiposDiscoDuro = ?, estadoId = ?, usuarioId = ? WHERE equiposFolio = ?',
                [serie, marcaM, tipoM, modelo, ram, velocidad, disco, estado, usuarioId, folio],
                (error, results) => {
                    if (error) {
                        console.log('Error al actualizar el equipo:', error);
                        return res.status(500).send({ message: 'Hubo un error al actualizar el equipo.' });
                    } else {
                        // Redirigir a la página de equipos después de la actualización
                        res.redirect('/equiposJ');
                    }
                }
            );
        });
    } catch (error) {
        console.log('Error al actualizar el equipo:', error);
        res.status(500).render('errores/error');
    }
};

exports.updateAsignacion = async (req, res) => {
    const {id, folio, personal, lugar, fecha, estado } = req.body;
    const user =req.session.name
    try{
        conexion.query('SELECT usuarioId FROM usuarios WHERE usuarioNombre = ?', [user], (error, userResult) => {
            if (error) {
                console.error('Error al obtener el ID de usuario:', error);
                return res.render('errores/error');
            }
            const usuarioId = userResult[0].usuarioId;
            conexion.query('SELECT estadoId FROM estado WHERE estadoNombre = ?', [estado], (error, estadoResult) => {
                if (error) {
                    console.error('Error al obtener el ID de usuario:', error);
                    return res.render('errores/error');
                }
                const estadoId = estadoResult[0].estadoId;
                // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
                conexion.query('UPDATE asignarEquipos SET equiposFolio = ?, personalId = ?, lugarId = ?, asignarEquiposFecha= ?, usuarioId = ?, estadoId = ? WHERE asignarEquiposId = ?',
                [folio, personal, lugar, fecha, usuarioId, estadoId, id], (error, results) => {
                    if (error) {
                        console.log('Error al actualizar al equipo:', error);
                        res.render('errores/error');
                    } else {
                        // Redirigir a la página de tipos de equipos después de la actualización
                        res.redirect('/consultaAsignacion');
                    }
                });
                })
        });
    } catch{
    }
};