const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Product = require('../models/productsModel');


// Método obtener todos los productos 
router.get('/all',auth, async (req, res) => {

  const product = await Product.find({userId: req.user});
  res.json(product);

});

// Método obtener un único producto 

router.get('/:id', auth, async (req, res) => {

  const product = await Product.findById(req.params.id);
  res.json(product);

});


// Método Crear
router.post('/', auth, async (req, res) => {

  const { nombre, tipo, precio, cantidad } = req.body;
  const product = new Product({
    nombre,
    tipo, 
    precio,
    cantidad,
    userId: req.user
  });
  await product.save();
  res.json({ 
    status: 200,
    description: 'producto guardado'
   });
});

// Método Actualizar 
router.put('/:id', auth, async (req, res) => {

  const { nombre, tipo, precio, cantidad } = req.body;
  const newProduct = { nombre, tipo, precio, cantidad };
  await Product.findByIdAndUpdate(req.params.id, newProduct);
  res.json({
    status:200,
    description: 'producto actualizado'
  });
});

// Método Borrar 

router.delete('/:id', auth, async (req, res) => {

  await Product.findByIdAndRemove(req.params.id);
  res.json({
    status:200,
    description: 'producto eliminado'
  });

});


module.exports = router;