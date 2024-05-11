const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.autenticarUsuario = async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    if (user && pass) {
        conexion.query('SELECT * FROM usuarios WHERE usuarioUser = ?', [user], async (error, results, fields) => {
            if (error) {
                console.error('Error al buscar usuario:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }

            if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].usuarioContraseña))) {
                req.session.loggedin = false;
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                const rol = results[0].rolId; // Obtener el rol del usuario
                if (rol === 1) {
                    // Cuando el usuario inicia sesión correctamente
                    req.session.loggedin = true;
                    req.session.name = results[0].usuarioNombre;
                    req.session.rol = results[0].rolId;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'indexJ'
                    });
                } if (rol === 2) {
                    // Cuando el usuario inicia sesión correctamente
                    req.session.loggedin = true;
                    req.session.name = results[0].usuarioNombre;
                    req.session.rol = results[0].rolId;

                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'indexS'
                    });
                }
            }
            res.end();
        });
    } else {
        res.send('Por favor ingrese un usuario y una contraseña');
    }
};

exports.cerrarSesión = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
