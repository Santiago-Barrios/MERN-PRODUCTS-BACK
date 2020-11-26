const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Type = require('../models/typeModel');

// Método obtener todos los Types 
router.get('/all',auth, async (req, res) => {

  const type = await Type.find({userId: req.user});
  res.json(type);
});

// Método obtener un único producto 
router.get('/:id', auth, async (req, res) => {

  const type = await Type.findById(req.params.id);
  res.json(type);
});

// Método Crear Type
router.post('/', auth, async (req, res) => {

  const {typeName} = req.body;
  const type = new Type({
    typeName,
    userId: req.user
  })
  await type.save();
  res.json({
    status: 200,
    description: 'categoria o tipo guardado',
    type: type, 
   });
});

// Método Actualizar Type
router.put('/:id', auth, async (req, res) => {

  const { typeName } = req.body;
  const newType = { typeName };
  await Type.findByIdAndUpdate(req.params.id, newType);
  res.json({
    status:200,
    description: 'producto actualizado',
    Type: newType,
  });
});

// Método Borrar Type
router.delete('/:id', auth, async (req, res) => {

  await Type.findByIdAndRemove(req.params.id);
  res.json({
    status:200,
    description: 'producto eliminado'
  });

});

module.exports = router;