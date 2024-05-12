//registroControllerS

const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.registrarUsuario = async (req, res) => {
    const usuario = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.password;
    
    try {
        let passwordHash = await bcryptjs.hash(pass, 8);
        
        // Insertar usuario en la base de datos
        await new Promise((resolve, reject) => {
            conexion.query('INSERT INTO usuarios SET ?', { usuarioNombre: name, usuarioUser: usuario, rolId: rol, usuarioContraseña: passwordHash }, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        // Realizar la consulta para recuperar los roles
        const roles = await obtenerRoles();
        const options = roles.map(rol => `<option value="${rol.rolId}">${rol.rolNombre}</option>`);
        const selectElement = `<select class="form-control mb-3" name="rol" id="rol" class="select-css">
            <option value="">Selecciona el Rol</option>
            ${options.join('')}
            </select>`;

        res.render('supervisor/registros', { 
            selectElement: selectElement,
            name: req.session.name,
            alert: true,
            alertTitle: "Registros de Usuarios",
            alertMessage: "¡Se registró correctamente!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'userS'
        });
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        res.render('supervisor/registros', {
            name: req.session.name,
            alert: true,
            alertTitle: "Error al registrar usuario",
            alertMessage: "¡Ocurrió un error al registrar el usuario!",
            alertIcon: 'error',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'userS'
        });
    }
};

exports.registrarTipo = async (req, res) => {
    const nuevoTipo = req.body.nombre;
        try {
            conexion.query('SELECT * FROM tipoEquipo WHERE tipoEquipoNombre = ?', [nuevoTipo], (error, results) => {
                if (error) {
                    console.error('Error al verificar si el tipo de equipo existe:', error);
                    return res.render('errores/error');
                }
                // Si el tipo de equipo ya existe, mostrar un mensaje de error
                if (results.length > 0) {
                    conexion.query('SELECT * FROM tipoEquipo', (error, todoslosTipos) => {
                        if (error) {
                            console.error('Error al obtener los tipos de equipo:', error);
                        }
                        return res.render('supervisor/tiposEquipos', {
                            results: todoslosTipos, // Mostrar solo el tipo de equipo existente
                            name: req.session.name,
                            alert: true, // No es necesario mostrar la alerta de inserción completada
                            alertTitle: "Error al Insertar",
                            alertMessage: "Este tipo ya existe",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'tiposEquiposS'
                        });
                    });
                }

                // Si el tipo de equipo no existe, insertarlo en la base de datos
                conexion.query('INSERT INTO tipoEquipo SET ?', { tipoEquipoNombre: nuevoTipo }, (error, insertResult) => {
                    if (error) {
                        console.error('Error al insertar el tipo de equipo:', error);
                    }

                    // Después de la inserción exitosa, realizar una nueva consulta para obtener todos los tipos de equipo existentes
                    conexion.query('SELECT * FROM tipoEquipo', (error, tiposEquipos) => {
                        if (error) {
                            console.error('Error al obtener los tipos de equipo:', error);
                        }

                        // Mostrar mensaje de éxito y todos los tipos de equipo obtenidos
                        res.render('supervisor/tiposEquipos', {
                            results: tiposEquipos,
                            name: req.session.name,
                            alert: true,
                            alertTitle: "Inserción Completada",
                            alertMessage: "Se insertó correctamente el tipo de equipo",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'tiposEquiposS'
                        });
                    });
                });
            });
        } catch (error) {
            console.error('Error en el controlador:', error);
            res.render('errores/error');
        }
};


exports.registrarLugar = async (req, res) => {
    const nuevaSigla = req.body.siglas;
    const nuevoEdificio = req.body.edificio;
    
    try {
        // Verificar si el lugar ya existe
        conexion.query('SELECT * FROM lugar WHERE lugarSiglas = ? AND lugarEdificios = ?', [nuevaSigla, nuevoEdificio], (error, results) => {
            if (error) {
                console.error('Error al verificar si el lugar existe:', error);
                return res.render('errores/error');
            }

            // Si el lugar ya existe, mostrar un mensaje de error
            if (results.length > 0) {
                return res.render('supervisor/lugar', {
                    results: results,
                    name: req.session.name,
                    alert: true,
                    alertTitle: "Error al Insertar",
                    alertMessage: "Este lugar ya existe",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'lugarS'
                });
            }

            // Si el lugar no existe, insertarlo en la base de datos
            conexion.query('INSERT INTO lugar SET ?', { lugarSiglas: nuevaSigla, lugarEdificios: nuevoEdificio }, (error, insertResult) => {
                if (error) {
                    console.error('Error al insertar el lugar:', error);
                    return res.render('errores/error');
                }

                // Después de la inserción exitosa, realizar una nueva consulta para obtener todos los lugares existentes
                conexion.query('SELECT * FROM lugar', (error, lugares) => {
                    if (error) {
                        console.error('Error al obtener los lugares:', error);
                        return res.render('errores/error');
                    }

                    // Mostrar mensaje de éxito y todos los lugares obtenidos
                    res.render('supervisor/lugar', {
                        results: lugares,
                        name: req.session.name,
                        alert: true,
                        alertTitle: "Inserción Completada",
                        alertMessage: "Se insertó correctamente el lugar",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'lugarS'
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.render('errores/error');
    }
};


exports.registrarMarca = async (req, res) => {
    const nuevaMarca = req.body.nombre;
        try {
            conexion.query('SELECT * FROM marca WHERE marcaNombre = ?', [nuevaMarca], (error, results) => {
                if (error) {
                    console.error('Error al verificar si el tipo de equipo existe:', error);
                    return res.render('errores/error');
                }
                // Si el tipo de equipo ya existe, mostrar un mensaje de error
                if (results.length > 0) {
                    conexion.query('SELECT * FROM Marca', (error, todaslasMarcas) => {
                        if (error) {
                            console.error('Error al obtener los tipos de equipo:', error);
                        }
                        return res.render('supervisor/Marca', {
                            results: todaslasMarcas, // Mostrar solo el tipo de equipo existente
                            name: req.session.name,
                            alert: true, // No es necesario mostrar la alerta de inserción completada
                            alertTitle: "Error al Insertar",
                            alertMessage: "Esta Marca ya existe",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'MarcaS'
                        });
                    });
                }

                // Si el tipo de equipo no existe, insertarlo en la base de datos
                conexion.query('INSERT INTO marca SET ?', { marcaNombre: nuevaMarca }, (error, insertResult) => {
                    if (error) {
                        console.error('Error al insertar el tipo de equipo:', error);
                    }

                    // Después de la inserción exitosa, realizar una nueva consulta para obtener todos los tipos de equipo existentes
                    conexion.query('SELECT * FROM marca', (error, Marcas) => {
                        if (error) {
                            console.error('Error al obtener los tipos de equipo:', error);
                        }

                        // Mostrar mensaje de éxito y todos los tipos de equipo obtenidos
                        res.render('supervisor/marca', {
                            results: Marcas,
                            name: req.session.name,
                            alert: true,
                            alertTitle: "Inserción Completada",
                            alertMessage: "Se insertó correctamente la nueva Marca",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'MarcaS'
                        });
                    });
                });
            });
        } catch (error) {
            console.error('Error en el controlador:', error);
            res.render('errores/error');
        }
};

exports.registrarPersonal = async (req, res) => {
    const nuevoNombre = req.body.nombre;
    const nuevoNumero = req.body.numero;
    const nuevoPuesto = req.body.puesto;
    
    try {
        // Verificar si el lugar ya existe
        conexion.query('SELECT * FROM personal WHERE personalNombre = ? AND personalNumero = ? AND personalPuesto = ?', [nuevoNombre, nuevoNumero, nuevoPuesto], (error, results) => {
            if (error) {
                console.error('Error al verificar si el personal existe:', error);
                return res.render('errores/error');
            }

            // Si el lugar ya existe, mostrar un mensaje de error
            if (results.length > 0) {
                return res.render('supervisor/personal', {
                    results: results,
                    name: req.session.name,
                    alert: true,
                    alertTitle: "Error al Insertar",
                    alertMessage: "Este personal ya existe",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'personalS'
                });
            }

            // Si el lugar no existe, insertarlo en la base de datos
            conexion.query('INSERT INTO personal SET ?', { personalNombre: nuevoNombre, personalNumero: nuevoNumero, personalPuesto: nuevoPuesto }, (error, insertResult) => {
                if (error) {
                    console.error('Error al insertar al personal:', error);
                    return res.render('errores/error');
                }

                // Después de la inserción exitosa, realizar una nueva consulta para obtener todos los lugares existentes
                conexion.query('SELECT * FROM personal', (error, lugares) => {
                    if (error) {
                        console.error('Error al obtener a los empleados:', error);
                        return res.render('errores/error');
                    }

                    // Mostrar mensaje de éxito y todos los lugares obtenidos
                    res.render('supervisor/personal', {
                        results: lugares,
                        name: req.session.name,
                        alert: true,
                        alertTitle: "Inserción Completada",
                        alertMessage: "Se insertó correctamente al empleado",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'personalS'
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.render('errores/error');
    }
};
