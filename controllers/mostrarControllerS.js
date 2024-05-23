const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.mostrarTipo = async (req, res) => {
    conexion.query('SELECT * FROM tipoequipo',(error, results)=>{
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
    const sql = `
        SELECT e.*, m.marcaNombre, te.tipoEquipoNombre, es.estadoNombre, u.usuarioNombre 
        FROM equipos e 
        INNER JOIN marca m ON e.marcaId = m.marcaId 
        INNER JOIN tipoequipo te ON e.tipoEquipoId = te.tipoEquipoId 
        INNER JOIN estado es ON e.estadoId = es.estadoId 
        INNER JOIN usuarios u ON e.usuarioId = u.usuarioId 
        WHERE e.estadoId = 1`;

    conexion.query(sql, (error, results) => {
        if (error) {
            console.log('Error al consultar la base de datos:', error);
            res.render('errores/error');
        } else {
            // Log para depuración
            console.log(results);

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

exports.mostrarAsignacion = async (req, res) => {
    try {
        conexion.query('SELECT ae.asignarEquiposId, es.estadoNombre, ae.equiposFolio, e.equiposSerie, u.usuarioNombre, te.tipoEquipoNombre AS tipoEquipoNombre, e.equiposmodelo AS equiposmodelo, m.marcaNombre AS marcaNombre, e.equiposRam AS equiposRam, e.equiposVelocidad AS equiposVelocidad, e.equiposDiscoDuro AS equiposDiscoDuro, p.personalNombre AS personalNombre, p.personalId AS personalId, u.usuarioNombre AS usuarioNombre, u.usuarioId AS usuarioId, l.lugarSiglas, l.lugarEdificios, l.lugarId AS lugarId, es.estadoId AS estadoId ,ae.asignarEquiposFecha, es.estadoNombre AS estadoNombre FROM asignarEquipos ae JOIN equipos e ON ae.equiposFolio = e.equiposFolio JOIN tipoequipo te ON e.tipoEquipoId = te.tipoEquipoId JOIN marca m ON e.marcaId = m.marcaId JOIN personal p ON ae.personalId = p.personalId JOIN usuarios u ON ae.usuarioId = u.usuarioId JOIN lugar l ON ae.lugarId = l.lugarId JOIN estado es ON ae.estadoId = es.estadoId WHERE ae.estadoId = 3', (error, results) => {
            if (error) {
                console.log('Error al consultar la base de datos:', error);
                res.render('errores/error');
            } else {                      
                res.render('supervisor/consultaAsignacion', { results: results, name: req.session.name });
            }   
        })
    } catch (error) {
        console.log('Error al actualizar al equipo:', error);
    }
};


exports.mostrarBajas = async (req, res) => {
    const user = req.session.name;
    try{
        conexion.query('SELECT e.*, m.marcaNombre, es.estadoNombre, te.tipoEquipoNombre, u.usuarioNombre FROM equipos e INNER JOIN marca m ON e.marcaId = m.marcaId INNER JOIN tipoequipo te ON e.tipoEquipoId = te.tipoEquipoId INNER JOIN estado es ON e.estadoId = es.estadoId INNER JOIN usuarios u ON e.usuarioId = u.usuarioId WHERE e.estadoId = 2',(error, results)=>{
            if(error){
                console.error('Error al consultar la base de datos:', error);
                res.render('errores/error', { message: 'Error al consultar la base de datos' });
            } else {                       
                res.render('supervisor/bajasEquipos', { results: results, name: req.session.name });
            }   
        })
    }catch(error){
        console.log('Error al mostrar el equipo:', error);
        res.status(500).render('errores/error');
    }
};


exports.mostrarBodega = async (req, res) => {
    try{
        conexion.query('SELECT bd.bodegaDesmontajeId, es.estadoNombre, bd.equiposFolio, e.equiposSerie, te.tipoEquipoNombre AS tipoEquipoNombre, e.equiposmodelo AS equiposmodelo, m.marcaNombre AS marcaNombre, e.equiposRam AS equiposRam, e.equiposVelocidad AS equiposVelocidad, e.equiposDiscoDuro AS equiposDiscoDuro, u.usuarioNombre AS usuarioNombre, es.estadoId AS estadoId , es.estadoNombre AS estadoNombre, bd.bodegaDesmontajeFecha FROM bodegaDesmontaje bd JOIN equipos e ON bd.equiposFolio = e.equiposFolio JOIN tipoequipo te ON e.tipoEquipoId = te.tipoEquipoId JOIN marca m ON e.marcaId = m.marcaId JOIN usuarios u ON bd.usuarioId = u.usuarioId JOIN estado es ON bd.estadoId = es.estadoId WHERE bd.estadoId = 4',(error, results)=>{
            if(error){
                console.log('Error al consultar la base de datos:', error);
                res.render('errores/error');
            } else {                      
                res.render('supervisor/bodegaDesmontaje', { results: results, name: req.session.name });
            }   
        })
    }catch (error){
        console.log('Error al actualizar la bodega:', error);
    }
};
