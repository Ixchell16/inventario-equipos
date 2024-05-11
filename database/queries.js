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
    conexion.query('SELECT tipoEquipoId, tipoEquipoNombre FROM tipoEquipo', (error, resultados) => {
        if (error) {
            console.log('Error al obtener el tipo: ', error);
            res.status(500).json({ error: 'Error al obtener el tipo' });
            return;
        }
        res.json(resultados);
    });
};