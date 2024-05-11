const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.mostrarRol = async (req, res) => {
    try {
        const roles = await obtenerRoles();
        const options = roles.map(rol => `<option value="${rol.rolId}">${rol.rolNombre}</option>`);
        const selectElement = `<select class="form-control mb-3" name="rol" id="rol" class="select-css">
            <option value="">Selecciona el Rol</option>
            ${options.join('')}
            </select>`;
        res.render('supervisor/registros', { selectElement: selectElement, name: req.session.name });
    } catch (error) {
        console.error('Error al obtener roles:', error);
    }
};

exports.mostrarUser = async (req, res) => {
    conexion.query('SELECT u.*, r.rolNombre FROM usuarios u INNER JOIN rol r ON u.rolId = r.rolId', (error, results) => {
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('errores/error');
        } else {                       
            res.render('supervisor/ConsultaUsers', { results: results, name: req.session.name });
        }   
    });
};
