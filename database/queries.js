// database/queries.js

const conexion = require('./db');

// Función para obtener los roles
exports.obtenerRoles = () => {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT rolId, rolNombre FROM rol', (error, resultados, campos) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultados);
            }
        });
    });
};

// Función para obtener las marcas
exports.obtenerMarcas = (req, res) => {
    conexion.query('SELECT marcaId, marcaNombre FROM marca', (error, resultados) => {
        if (error) {
            console.log('Error al obtener marcas: ', error);
            res.status(500).json({ error: 'Error al obtener marcas' });
            return;
        }
        res.json(resultados);
    });
};

exports.obtenerTipo = (req, res) => {
    conexion.query('SELECT tipoEquipoId, tipoEquipoNombre FROM tipoequipo', (error, resultados) => {
        if (error) {
            console.log('Error al obtener el tipo: ', error);
            res.status(500).json({ error: 'Error al obtener el tipo' });
            return;
        }
        res.json(resultados);
    });
};

// Función para obtener los select del Modal
exports.obtenerMarcasM = (req, res) => {
    conexion.query('SELECT marcaId, marcaNombre FROM marca', (error, resultados) => {
        if (error) {
            console.log('Error al obtener marcas: ', error);
            res.status(500).json({ error: 'Error al obtener marcas' });
            return;
        }
        res.json(resultados);
    });
};

exports.obtenerTipoM = (req, res) => {
    conexion.query('SELECT tipoEquipoId, tipoEquipoNombre FROM tipoequipo', (error, resultados) => {
        if (error) {
            console.log('Error al obtener el tipo: ', error);
            res.status(500).json({ error: 'Error al obtener el tipo' });
            return;
        }
        res.json(resultados);
    });
};

exports.obtenerEquiposFolio = (req, res) => {
    const username = req.session.name;
    try{
        conexion.query('SELECT * FROM usuarios WHERE usuarioNombre = ?', [username],(error, results)=>{
            const usuarioId = results[0].usuarioId;
            conexion.query('SELECT equiposFolio FROM equipos WHERE estadoId = 1 &&  usuarioId =?',[usuarioId], (error, resultados) => {
                if (error) {
                    console.log('Error al obtener el folio: ', error);
                    res.status(500).json({ error: 'Error al obtener el folio' });
                    return;
                }
                res.json(resultados);
            });
        })
    }catch (error){
        console.log('Error al actualizar al equipo:', error);
    }
};

exports.obtenerEquiposFolioS = (req, res) => {
    const username = req.session.name;
    try{
        conexion.query('SELECT * FROM usuarios WHERE usuarioNombre = ?', [username],(error, results)=>{
            const usuarioId = results[0].usuarioId;
            conexion.query('SELECT equiposFolio FROM equipos WHERE estadoId = 1 &&  usuarioId =?',[usuarioId], (error, resultados) => {
                if (error) {
                    console.log('Error al obtener el folio: ', error);
                    res.status(500).json({ error: 'Error al obtener el folio' });
                    return;
                }
                res.json(resultados);
            });
        })
    }catch (error){
        console.log('Error al actualizar al equipo:', error);
    }
};

exports.obtenerEquipos = (req, res) => {
    try {
        const folio = req.params.folio; // Obtener el folio del parámetro de la ruta
        conexion.query('SELECT e.equiposSerie AS equiposSerie, m.marcaNombre AS marcaNombre, te.tipoEquipoNombre AS tipoEquipoNombre, e.equiposmodelo AS equiposmodelo, e.equiposRam AS equiposRam, e.equiposVelocidad AS equiposVelocidad, e.equiposDiscoDuro AS equiposDiscoDuro FROM equipos e JOIN marca m ON e.marcaId = m.marcaId JOIN tipoequipo te ON e.tipoEquipoId = te.tipoEquipoId WHERE e.equiposFolio = ?', [folio], (error, resultados) => {
            if (error) {
                console.error('Error al obtener el equipo:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
            if (resultados.length === 0) {
                return res.status(404).json({ mensaje: 'Equipo no encontrado' });
            }
            // Como solo esperamos un equipo por folio, tomamos el primer resultado
            const equipo = resultados[0];
            res.json(equipo); // Enviar los datos del equipo como respuesta
        });
    } catch (error) {
        console.error('Error al obtener el equipo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.obtenerPersonal = (req, res) => {
    conexion.query('SELECT personalId, personalNombre FROM personal', (error, resultados) => {
        if (error) {
            console.log('Error al obtener al personal: ', error);
            res.status(500).json({ error: 'Error al obtener al personal' });
            return;
        }
        res.json(resultados);
    });
};

exports.obtenerLugarId = (req, res) => {
    conexion.query('SELECT lugarId, lugarSiglas FROM lugar', (error, resultados) => {
        if (error) {
            console.log('Error al obtener el lugar: ', error);
            res.status(500).json({ error: 'Error al obtener el lugar' });
            return;
        }
        res.json(resultados);
    });
};

exports.obtenerLugar = (req, res) => {
    try {
        const id = req.params.id; // Obtener el folio del parámetro de la ruta
        conexion.query('SELECT lugarEdificios FROM lugar WHERE lugarId = ?', [id], (error, resultados) => {
            if (error) {
                console.error('Error al obtener el equipo:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
            if (resultados.length === 0) {
                return res.status(404).json({ mensaje: 'Lugar no encontrado' });
            }
            // Como solo esperamos un equipo por folio, tomamos el primer resultado
            const equipo = resultados[0];
            res.json(equipo); // Enviar los datos del equipo como respuesta
        });
    } catch (error) {
        console.error('Error al obtener el equipo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.obtenerEquiposFolioJ = (req, res) => {
    const username = req.session.name;
    try{
        conexion.query('SELECT * FROM usuarios WHERE usuarioNombre = ?', [username],(error, results)=>{
            const usuarioId = results[0].usuarioId;
            conexion.query('SELECT equiposFolio FROM equipos WHERE estadoId = 2 &&  usuarioId =?',[usuarioId], (error, resultados) => {
                if (error) {
                    console.log('Error al obtener el folio: ', error);
                    res.status(500).json({ error: 'Error al obtener el folio' });
                    return;
                }
                res.json(resultados);
            });
        })
    }catch (error){
        console.log('Error al actualizar al equipo:', error);
    }
};