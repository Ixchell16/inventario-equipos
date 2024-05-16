//deleteController.js

const conexion = require('../database/db');

exports.deleteTipo = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Eliminar el tipo de equipo de la base de datos
        conexion.query('DELETE FROM tipoequipo WHERE tipoEquipoId = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el tipo de equipo:', error);
        res.render('errores/error');
    }
}

exports.deleteMarca = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Eliminar el tipo de equipo de la base de datos
        conexion.query('DELETE FROM marca WHERE marcaId = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el tipo de equipo:', error);
        res.render('errores/error');
    }
}

exports.deleteLugar = async (req, res) => {
    const { id } = req.params; 
    try {
        // Eliminar el tipo de equipo de la base de datos
        conexion.query('DELETE FROM lugar WHERE lugarId = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el lugar:', error);
        res.render('errores/error');
    }
}

exports.deletePersonal = async (req, res) => {
    const { id } = req.params; 
    try {
        // Eliminar el tipo de equipo de la base de datos
        conexion.query('DELETE FROM personal WHERE personalId = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el lugar:', error);
        res.render('errores/error');
    }
}

exports.deleteEquipos = async (req, res) => {
    const { id } = req.params; 
    try {
        // Verificar si el equipo ha sido asignado
        const equipoAsignado = await verificarAsignacion(id);
        if (equipoAsignado) {
            // Si el equipo ha sido asignado, enviar un mensaje de error al cliente
            res.status(400).json({ error: 'No se puede eliminar el equipo porque está asignado.' });
            return;
        }
        
        // Si el equipo no ha sido asignado, eliminarlo de la base de datos
        conexion.query('DELETE FROM equipos WHERE equiposFolio = ?', [id], (error, results) => {
            if (error) {
                console.error('Error al eliminar el equipo:', error);
                res.status(500).json({ error: 'Ocurrió un error al eliminar el equipo.' });
            } else {
                res.json({ success: true });
            }
        });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el equipo:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el equipo.' });
    }
}


// Función para verificar si un equipo ha sido asignado
async function verificarAsignacion(idEquipo) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM asignarEquipos WHERE equiposFolio = ?', [idEquipo], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Si hay resultados, significa que el equipo está asignado
                // Si no hay resultados, el equipo no está asignado
                resolve(results.length > 0);
            }
        });
    });
}

exports.deleteAsignacion = async (req, res) => {
    const { id } = req.params; 
    try {
        // Eliminar el tipo de equipo de la base de datos
        conexion.query('DELETE FROM asignarEquipos WHERE asignarEquiposId = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el lugar:', error);
        res.render('errores/error');
    }
}