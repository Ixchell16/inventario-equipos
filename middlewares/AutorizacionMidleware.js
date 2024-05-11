// authzMiddleware.js  ------------ Middleware de autorización
const autorizacionMiddleware = (rolRequerido) => {
    return (req, res, next) => {
        if (req.session.loggedin && req.session.rol === rolRequerido) {
            next(); // El usuario tiene el rol requerido, permite el acceso
        } else {
            // El usuario no tiene el rol requerido, redirige a una página de error o deniega el acceso
            res.redirect('errorAcceso');
        }
    };
};

module.exports = autorizacionMiddleware;
