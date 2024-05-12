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
        // Eliminar el tipo de equipo de la base de datos
        conexion.query('DELETE FROM equipos WHERE equiposFolio = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar el lugar:', error);
        res.render('errores/error');
    }
}