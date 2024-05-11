const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.updateUser = async (req, res) => {
    const {userId, nombre, users, rol, pass } = req.body;
    try {
        // Ejecutar consulta SQL para actualizar el tipo de equipo en la base de datos
        let passwordHash = await bcryptjs.hash(pass, 8);
        await new Promise((resolve, reject) => {
            conexion.query('UPDATE usuarios SET usuarioNombre = ?, usuarioUser = ?, rolId = ?, usuarioContraseña = ? WHERE usuarioId = ?', [nombre, users, rol, passwordHash ,userId], (error, results) => {
                if (error) {
                    console.log('Error al actualizar al usuariooo:', error);
                    res.render('errores/error');
                } else {
                    // Redirigir a la página de tipos de equipos después de la actualización
                    res.redirect('/consultarUsers');
                }
            });
        });
    } catch (error) {
        console.log('Error al actualizar el usuario:', error);
        res.render('errores/error');
    }
};