const conexion = require('../database/db');

exports.deleteUsers = async (req, res) => {
    const { id } = req.params; 
    try {
        // Eliminar el tipo de equipo de la base de datos
        await conexion.query('DELETE FROM usuarios WHERE usuarioId = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar Usuario:', error);
        res.render('errores/error');
    }
}