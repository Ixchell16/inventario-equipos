// authMiddleware.js

const autenticacionMiddleware = (req, res, next) => {
    if (req.session.loggedin) {
        req.user = {
            name: req.session.name,
            rol: req.session.rol
        };
        next();// Si el usuario está autenticado, pasa al siguiente middleware
    } else {
        res.redirect('login');
    }
};

module.exports = autenticacionMiddleware;
