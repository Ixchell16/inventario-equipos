const { obtenerRoles } = require('../database/queries');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.mostrarRegistros = async (req, res) => {
    try {
        const roles = await obtenerRoles();
        const options = roles.map(rol => `<option value="${rol.rolId}">${rol.rolNombre}</option>`);
        const selectElement = `<select class="form-control mb-3" name="rol" id="rol" class="select-css">
            <option value="">Selecciona el Rol</option>
            ${options.join('')}
            </select>`;
        res.render('supervisor/registros', { selectElement: selectElement, name: req.session.name});
    } catch (error) {
        console.error('Error al obtener roles:', error);
    }
};


exports.registrarUsuario = async (req, res) => {
    const usuario = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.password;
    
    try {
        let passwordHash = await bcryptjs.hash(pass, 8);
        
        // Insertar usuario en la base de datos
        await new Promise((resolve, reject) => {
            conexion.query('INSERT INTO usuarios SET ?', { usuarioNombre: name, usuarioUser: usuario, rolId: rol, usuarioContraseña: passwordHash }, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        // Realizar la consulta para recuperar los roles
        const roles = await obtenerRoles();
        const options = roles.map(rol => `<option value="${rol.rolId}">${rol.rolNombre}</option>`);
        const selectElement = `<select class="form-control mb-3" name="rol" id="rol" class="select-css">
            <option value="">Selecciona el Rol</option>
            ${options.join('')}
            </select>`;

        res.render('supervisor/registros', { 
            selectElement: selectElement,
            name: req.session.name,
            alert: true,
            alertTitle: "Registros de Usuarios",
            alertMessage: "¡Se registró correctamente!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'userS'
        });
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        res.render('supervisor/registros', {
            name: req.session.name,
            alert: true,
            alertTitle: "Error al registrar usuario",
            alertMessage: "¡Ocurrió un error al registrar el usuario!",
            alertIcon: 'error',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'userS'
        });
    }
};
