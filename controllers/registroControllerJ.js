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
    const nuevoEstado = req.body.estado

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
            conexion.query('SELECT estadoId FROM estado WHERE estadoNombre = ?', [nuevoEstado], (error, estadoResults) => {
                if (error) {
                    console.log('Error al obtener el estado:', error);
                    return res.status(500).send({ message: 'Hubo un error al obtener el estado.' });
                }
                if (userResults.length === 0) {
                    return res.status(400).send({ message: 'Estado no encontrado' });
                }
                const estadoId = estadoResults[0].estadoId;
                // Verificar si el equipo ya existe
                conexion.query('SELECT * FROM equipos WHERE equiposFolio = ? OR equiposSerie = ?', [nuevoFolio, nuevaSerie], (error, results) => {
                    if (error) {
                        console.log('Error al verificar si existe:', error);
                        return res.status(500).send({ message: 'Hubo un error al verificar el equipo.' });
                    }
                    
                    if (results.length > 0) {
                        return res.status(400).send({ message: 'El folio o el numero de serie ya existen, Por favor ingrese uno diferente' });
                    } else {
                        // Insertar el nuevo equipo
                        conexion.query('INSERT INTO equipos (equiposFolio, equiposSerie, marcaId, tipoEquipoId, equiposModelo, equiposRAM, equiposVelocidad, equiposDiscoDuro, estadoId, usuarioId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nuevoFolio, nuevaSerie, nuevaMarca, nuevoTipo, nuevoModelo, nuevaRAM, nuevaVelocidad, nuevoDisco, estadoId, usuarioId], (error, insertResult) => {
                            if (error) {
                                console.log('Error al insertar el equipo:', error);
                                return res.status(500).send({ message: 'Hubo un error al insertar el equipo.' });
                            } else {
                                return res.status(200).send({ message: 'El equipo se registró correctamente.' });
                            }
                        });
                    }
                });
            })
        });
    } catch (error) {
        console.log('Error al registrar el equipo:', error);
        return res.status(500).send({ message: 'Hubo un error al registrar el equipo.' });
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

            conexion.query('SELECT usuarioId FROM usuarios WHERE usuarioNombre = ?', [usuario], (error, userResult) => {
                if (error) {
                    console.error('Error al obtener el ID de usuario:', error);
                    return res.render('errores/error');
                }
                const usuarioId = userResult[0].usuarioId;
                conexion.query(
                    'UPDATE equipos SET estadoId = ? WHERE equiposFolio = ?', [ estadoId, nuevoFolio]
                );
                conexion.query('SELECT estadoId FROM estado WHERE estadoNombre = ?', [nuevoEstado], (error, estadoResults)=> {
                    if (error) {
                        console.error('Error al obtener el ID del estado:', error);
                        return res.render('errores/error');
                    }
                    const estadoId = estadoResults[0].estadoId;
                    // Si el equipo no ha sido asignado, insertarlo en la base de datos
                    conexion.query('INSERT INTO asignarEquipos (equiposFolio, PersonalId, lugarId, asignarEquiposFecha, usuarioId, estadoId) VALUES (?, ?, ?, ?, ?, ?)', 
                    [nuevoFolio, nuevoPersonal, nuevoLugar, nuevaFecha, usuarioId, estadoId], 
                    (error, insertResult) => {
                        if (error) {
                            console.error('Error al asignar el equipo:', error);
                            return res.render('errores/error');
                        } else{
                            // Mostrar mensaje de éxito y todos los equipos obtenidos
                            res.render('jefe/asignacionEquipos', {
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
            })
        })
        } catch (error) {
            console.error('Error en el controlador:', error);
            res.render('errores/error');
        }
    };

    exports.altaEquipos = async (req, res) => {
        const { id } = req.params;
        console.log(id) 
        try {        
            // Si el equipo no ha sido asignado, eliminarlo de la base de datos
            conexion.query('UPDATE equipos SET estadoId = ? WHERE equiposFolio = ?', ['1',id], (error, results) => {
                if (error) {
                    console.error('Error al dar de alta el equipo:', error);
                    res.status(500).json({ error: 'Ocurrió un error al dar de alta equipo.' });
                } else {
                    res.json({ success: true });
                }
            });
        } catch (error) {
            // Manejar errores
            console.error('Error al intentar de dar de alta el equipo:', error);
            res.status(500).json({ error: 'Ocurrió un error al dar de lata el equipo.' });
        }
    };

    exports.registrarBodega = async (req, res) => {
        const nuevoFolio = req.body.folio;
        const nuevaFecha = req.body.fecha;
        const nuevoEstado = req.body.estado;
        const usuario = req.session.name;
    
        try {
            // Verificar si la asignación ya existe
            conexion.query('SELECT * FROM bodegaDesmontaje WHERE equiposFolio = ?', [nuevoFolio], (error, results) => {
                if (error) {
                    console.error('Error al verificar si la asignación existe:', error);
                    return res.render('errores/error');
                }
                // Si el equipo ya existe, mostrar un mensaje de error
                if (results.length > 0) {
                    return res.render('jefe/bodegaDesmontaje', {  
                        results: results,
                        name: req.session.name,
                        alert: true,
                        alertTitle: "Error al Asignar este equipo",
                        alertMessage: "Este equipo ya fue asignado a otra persona",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'bodegaJ'
                    });
                }
    
                conexion.query('SELECT usuarioId FROM usuarios WHERE usuarioNombre = ?', [usuario], (error, userResult) => {
                    if (error) {
                        console.error('Error al obtener el ID de usuario:', error);
                        return res.render('errores/error');
                    }
                    const usuarioId = userResult[0].usuarioId;
                    conexion.query('SELECT estadoId FROM estado WHERE estadoNombre = ?', [nuevoEstado], (error, estadoResults)=> {
                        if (error) {
                            console.error('Error al obtener el ID del estado:', error);
                            return res.render('errores/error');
                        }
                        const estadoId = estadoResults[0].estadoId;
                        conexion.query(
                            'UPDATE equipos SET estadoId = ? WHERE equiposFolio = ?', [ estadoId, nuevoFolio]
                        );
                        // Si el equipo no ha sido asignado, insertarlo en la base de datos
                        conexion.query('INSERT INTO bodegaDesmontaje (bodegaDesmontajeFecha, equiposFolio, estadoId, usuarioId) VALUES (?, ?, ?, ?)', 
                        [nuevaFecha, nuevoFolio, estadoId, usuarioId], 
                        (error, insertResult) => {
                            if (error) {
                                console.error('Error al asignar el equipo:', error);
                                return res.render('errores/error');
                            } else{
                                // Mostrar mensaje de éxito y todos los equipos obtenidos
                                res.render('jefe/bodegaDesmontaje', {
                                    results: results,
                                    name: req.session.name,
                                    alert: true,
                                    alertTitle: "Inserción Completada",
                                    alertMessage: "Se asigno correctamente el equipo al usuario",
                                    alertIcon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'bodegaJ'
                                });
                            }
                        });
                    });
                })
            })
        } catch (error) {
            console.error('Error en el controlador:', error);
            res.render('errores/error');
        }
    };