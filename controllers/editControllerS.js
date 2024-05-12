//editController.js

const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.updateUser = async (req, res) => {
    const { usersId, nombre, users, rol, contraseña } = req.body;
    try {
        // Obtener el ID del rol basado en el nombre del rol proporcionado
        let rolId;
        await new Promise((resolve, reject) => {
            conexion.query('SELECT rolId FROM rol WHERE rolNombre = ?', [rol], (error, results) => {
                if (error) {
                    console.log('Error al obtener el ID del rol:', error);
                    res.status(500).send({ message: 'Hubo un error al actualizar el usuario.' });
                    reject(error);
                } else {
                    if (results.length === 0) {
                        res.status(404).send({ message: 'El rol no existe.' });
                    } else {
                        rolId = results[0].rolId;
                        resolve();
                    }
                }
            });
        });

        // Generar hash de la nueva contraseña
        let passwordHash = await bcryptjs.hash(contraseña, 8);

        // Ejecutar consulta SQL para actualizar el usuario en la base de datos
        await new Promise((resolve, reject) => {
            conexion.query('UPDATE usuarios SET usuarioNombre = ?, usuarioUser = ?, rolId = ?, usuarioContraseña = ? WHERE usuarioId = ?', [nombre, users, rolId, passwordHash, usersId], (error, results) => {
                if (error) {
                    console.log('Error al actualizar el usuario:', error);
                    res.render('errores/error');
                } else {
                    // Redirigir a la página de consulta de usuarios después de la actualización
                    res.status(200).send({ message: 'El usuario se actualizó correctamente.' });
                }
            });
        });
    } catch (error) {
        res.status(500).send({ message: 'Hubo un error al actualizar el usuario.' });
        console.log('Error al actualizar el usuario:', error);
    }
};

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
                res.redirect('/tiposEquiposS');
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
                res.redirect('/marcaS');
            }
        });
    } catch (error) {
        console.log('Error al actualizar el tipo de equipo:', error);
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
                res.redirect('/lugarS');
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
                res.redirect('/personalS');
            }
        });
    } catch (error) {
        console.log('Error al actualizar el lugar:', error);
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
                res.redirect('/equiposJ');
            }
        });
    } catch (error) {
        console.log('Error al actualizar al equipo:', error);
        res.render('errores/error');
    }
};