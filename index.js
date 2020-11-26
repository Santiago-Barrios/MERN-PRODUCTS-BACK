const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');

require('dotenv').config();

//set up express

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`the server works!! port on : ${PORT}`));

// connect mondodb

const URI = 'mongodb://localhost/mern-login';

mongoose.connect(URI)
        .then( db => console.log('DB is connected'))
        .catch( err => console.log(err));

// set up routes 

app.use('/users', require('./routes/user.routes'));
app.use('/products', require('./routes/products.routes'));
app.use('/types', require('./routes/types.routes'));
