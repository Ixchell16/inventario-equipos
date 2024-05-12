const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.mostrarTipo = async (req, res) => {
    conexion.query('SELECT * FROM tipoEquipo',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('supervisor/tiposEquipos', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarMarca = async (req, res) => {
    conexion.query('SELECT * FROM marca',(error, results)=>{
        if(error){
            console.error('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('supervisor/marca', { results: results, name: req.session.name });
        }   
    })
};


exports.mostrarLugar = async (req, res) => {
    conexion.query('SELECT * FROM lugar',(error, results)=>{
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('supervisor/lugar', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarPersonal = async (req, res) => {
    conexion.query('SELECT * FROM personal',(error, results)=>{
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('error');
        } else {                       
            res.render('supervisor/personal', { results: results, name: req.session.name });
        }   
    })
};

exports.mostrarEquipos = async (req, res) => {
    conexion.query('SELECT e.*, m.marcaNombre, te.tipoEquipoNombre FROM equipos e INNER JOIN marca m ON e.marcaId = m.marcaId INNER JOIN tipoEquipo te ON e.tipoEquipoId = te.tipoEquipoId', (error, results) => {
        if(error){
            console.log('Error al consultar la base de datos:', error);
            res.render('errores/error');
        } else {                       
            res.render('supervisor/equipos', { results: results, name: req.session.name });
        }   
    });
};

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
