# Mern Products App (Back)

Mern products App es una aplicación diseñada para enlistar productos creados por el usuario, que pertenezcan a un tipo especifico previamente establecidos por el mismo cliente.

Cuenta con sistema de logIn y Register, en donde se tienen las validaciones pertinentes para encriptar la clave del usuario y se genera un token que permite la navegación dentro de la aplicación en el Front. En este proyecto la parte del Back se trabajo con Node JS, Express y MongoDB, usando bycriptJS, mongoose, y jsonwebtoken para la autentificación del usuario.

La aplicación esta creada en el Front-End con React JS, haciendo uso del CDN de Materialize y CSS puro. Mern products App consume la data de este Back-End. Aquí te dejo el repositorio del Front-End para que lo corras después de correr este server [https://github.com/Santiago-Barrios/MERN-PRODUCTS-FRONT] (recuerda leer el readme de este proyecto también)


## Dependencias que usa la aplicación en el Front-End
-    "bcryptjs": "^2.4.3",
-    "cors": "^2.8.5",
-    "dotenv": "^8.2.0",
-    "express": "^4.17.1",
-    "g": "^2.0.1",
-    "jsonwebtoken": "^8.5.1",
-    "mongoose": "^5.10.13",
-    "nodemon": "^2.0.6"



### Instalación

Mern products App requiere [Node.js](https://nodejs.org/) v4+ para correr.

Instala las dependencies y devDependencies.

```sh
$ npm install
```
Para correr el proyecto de Node después de tener las dependencias y los node_modules
```sh
$ npm start
```

Recuerda despues de tener el server activo ejecutar el proyecto en el Front [https://github.com/Santiago-Barrios/MERN-PRODUCTS-FRONT], este proyecto de node corre en el puerto 5000, pero si gustas puedes cambiarlo desde el archivo index.js en la raiz del proyecto.

Cuando tengas la aplicación corriendo y ya te hayas registrado, primero debes crear los types de los productos para luego crear los productos, el resto es bastante intuitivo.


Para testear las peticiones se utilizó postman, aquí te dejo el link en donde encontrarás la colección del proyecto [https://www.getpostman.com/collections/efe824a0d1baa811b17a], debes importarla en postman con la opción de Link.