const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try{
    const token = req.header('x-api-key');
    if(!token){
      return res.status(401).json({
        mensaje: 'Sin autentificación del token, acceso denegado'
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
      return res.status(401).json({
        mensaje: 'Verificación del token falló, acceso denegado'
      });
    }

    req.user = verified.id;
    next();
  }catch (err){
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;