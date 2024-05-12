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
