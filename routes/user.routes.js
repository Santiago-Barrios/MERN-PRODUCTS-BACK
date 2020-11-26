const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {

  try{

  let { email, password, passwordCheck, displayName } = req.body;

    // validate 

    if (!email || !password || !passwordCheck){
      return res.status(400).json({
        mensaje: 'no están llenos los campos obligatorios'
      });
    }

    if (password.length < 5){
      return res.status(400).json({
        mensaje: 'la contraseña necesita tener al menos 5 caracteres'
      });
    }

    if (password !== passwordCheck){
      return res.status(400).json({
        mensaje: 'Debes ingresar la misma contraseña dos veces para la verificación'
      });
    }

    const existingUser = await User.findOne({email: email})

    if (existingUser){
      return res.status(400).json({
        mensaje: 'Una Cuenta con este email ya existe'
      });
    }

    if(!displayName){
      displayName = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    });
    
    const savedUser = await newUser.save();
    res.json(savedUser);

} catch (err){
    res.status(500).json({ error: err.message });
  }

});

router.post('/login', async (req, res) =>{
  try{

    const { email, password } = req.body;

    // validate 

    if (!email || !password){
      return res.status(400).json({
        mensaje: 'no están llenos los campos obligatorios'
      });
    }

    const user = await User.findOne({ email: email });
    if(!user){
      return res.status(400).json({
        mensaje: 'No ha sido registrada una cuenta con este email'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({
        mensaje: 'Contraseña o email inválido'
      });
    }

    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        // email: user.email,
      }
    })

  }catch (err){
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete', auth, async (req, res) => {
  try{

    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  
  }catch (err){
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenIsValid', async (req, res) =>{
  try{

    const token = req.header('x-api-key');
    if(!token){
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if(!user){
      return res.json(false);
    }

    return res.json(true);

  }catch (err){
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req,res) =>{
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});



module.exports = router;