const logoutUser = (req, res)  => {
    destroySession(req);
    res.redirect('/login');
  }
  // Función para destruir la sesión del usuario
  function destroySession(req) {
    req.session.destroy(() => {
    });
  }
  
module.exports =  logoutUser ;