//registroControllerJ

const conexion = require('../database/db');

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
                        return res.render('jefe/tiposEquipos', {
                            results: todoslosTipos, // Mostrar solo el tipo de equipo existente
                            name: req.session.name,
                            alert: true, // No es necesario mostrar la alerta de inserción completada
                            alertTitle: "Error al Insertar",
                            alertMessage: "Este tipo ya existe",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'tiposEquiposJ'
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
                        res.render('jefe/tiposEquipos', {
                            results: tiposEquipos,
                            name: req.session.name,
                            alert: true,
                            alertTitle: "Inserción Completada",
                            alertMessage: "Se insertó correctamente el tipo de equipo",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'tiposEquiposJ'
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
                return res.render('jefe/lugar', {
                    results: results,
                    name: req.session.name,
                    alert: true,
                    alertTitle: "Error al Insertar",
                    alertMessage: "Este lugar ya existe",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'lugarJ'
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
                    res.render('jefe/lugar', {
                        results: lugares,
                        name: req.session.name,
                        alert: true,
                        alertTitle: "Inserción Completada",
                        alertMessage: "Se insertó correctamente el lugar",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'lugarJ'
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
                        return res.render('jefe/Marca', {
                            results: todaslasMarcas, // Mostrar solo el tipo de equipo existente
                            name: req.session.name,
                            alert: true, // No es necesario mostrar la alerta de inserción completada
                            alertTitle: "Error al Insertar",
                            alertMessage: "Esta Marca ya existe",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'MarcaJ'
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
                        res.render('jefe/marca', {
                            results: Marcas,
                            name: req.session.name,
                            alert: true,
                            alertTitle: "Inserción Completada",
                            alertMessage: "Se insertó correctamente la nueva Marca",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'MarcaJ'
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
                return res.render('jefe/personal', {
                    results: results,
                    name: req.session.name,
                    alert: true,
                    alertTitle: "Error al Insertar",
                    alertMessage: "Este personal ya existe",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'personalJ'
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
                    res.render('jefe/personal', {
                        results: lugares,
                        name: req.session.name,
                        alert: true,
                        alertTitle: "Inserción Completada",
                        alertMessage: "Se insertó correctamente al empleado",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'personalJ'
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.render('errores/error');
    }
};

exports.registrarEquipos = async (req, res) => {
    const nuevoFolio = req.body.folio;
    const nuevaSerie = req.body.serie;
    const nuevaMarca = req.body.marca;
    const nuevoTipo = req.body.tipo;
    const nuevoModelo = req.body.modelo;
    const nuevaRAM = req.body.ram;
    const nuevaVelocidad = req.body.velocidad;
    const nuevoDisco = req.body.disco;

    try {
        // Verificar si el equipo ya existe
        conexion.query('SELECT * FROM equipos WHERE equiposFolio = ? AND equiposSerie = ?', [nuevoFolio, nuevaSerie], (error, results) => {
            if (error) {
                console.error('Error al verificar si el equipo existe:', error);
                return res.render('errores/error');
            }

            // Si el equipo ya existe, mostrar un mensaje de error
            if (results.length > 0) {
                return res.render('jefe/equipos', {  
                    results: results,
                    name: req.session.name,
                    alert: true,
                    alertTitle: "Error al Insertar",
                    alertMessage: "Este equipo ya existe",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'equiposJ'
                });
            }

            // Si el equipo no existe, insertarlo en la base de datos
            conexion.query('INSERT INTO equipos (equiposFolio, equiposSerie, marcaId, tipoEquipoId, equiposmodelo, equiposRAM, equiposVelocidad, equiposDiscoDuro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [nuevoFolio, nuevaSerie, nuevaMarca, nuevoTipo, nuevoModelo, nuevaRAM, nuevaVelocidad, nuevoDisco], 
                (error, insertResult) => {
                    if (error) {
                        console.error('Error al insertar el equipo:', error);
                        return res.render('errores/error');
                    }

                    // Después de la inserción exitosa, realizar una nueva consulta para obtener todos los equipos existentes
                    conexion.query('SELECT * FROM equipos', (error, equipos) => {
                        if (error) {
                            console.error('Error al obtener los equipos:', error);
                            return res.render('errores/error');
                        }

                        // Mostrar mensaje de éxito y todos los equipos obtenidos
                        res.render('jefe/equipos', { 
                            results: equipos,
                            name: req.session.name,
                            alert: true,
                            alertTitle: "Inserción Completada",
                            alertMessage: "Se insertó correctamente el equipo",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'equiposJ'
                        });
                    });
                });
        });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.render('errores/error');
    }
};

exports.registrarAsignacion = async (req, res) => {
    const nuevoFolio = req.body.folio;
    const nuevoPersonal = req.body.personal;
    const nuevoLugar = req.body.lugar;
    const nuevaFecha = req.body.fecha;
    const nuevoEstado = req.body.estado;
    const usuario = req.session.name;

    try {
        // Verificar si la asignación ya existe
        conexion.query('SELECT * FROM asignarEquipos WHERE equiposFolio = ?', [nuevoFolio], (error, results) => {
            if (error) {
                console.error('Error al verificar si la asignación existe:', error);
                return res.render('errores/error');
            }

            // Si el equipo ya existe, mostrar un mensaje de error
            if (results.length > 0) {
                return res.render('jefe/asignacionEquipos', {  
                    results: results,
                    name: req.session.name,
                    alert: true,
                    alertTitle: "Error al Asignar este equipo",
                    alertMessage: "Este equipo ya fue asignado a otra persona",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'asignacionJ'
                });
            }

            // Si el equipo no ha sido asignado, insertarlo en la base de datos
            conexion.query('INSERT INTO asignarEquipos (equiposFolio, PersonalId, lugarId, asignarEquiposFecha, asignarEquiposEstado, usuarioId) VALUES (?, ?, ?, ?, ?, ?)', 
                [nuevoFolio, nuevoPersonal, nuevoLugar, nuevaFecha, nuevoEstado, usuario], 
                (error, insertResult) => {
                    if (error) {
                        console.error('Error al asignar el equipo:', error);
                        return res.render('errores/error');
                    } else{
                        // Mostrar mensaje de éxito y todos los equipos obtenidos
                        res.render('jefe/asignacionEquipos', { 
                            results: equipos,
                            name: req.session.name,
                            alert: true,
                            alertTitle: "Inserción Completada",
                            alertMessage: "Se asigno correctamente el equipo al usuario",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'asignacionJ'
                        });
                    }
                });
        });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.render('errores/error');
    }
};
