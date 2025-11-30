const express = require('express');
const cors = require('cors');
const login = require('./services/login');
const items = require('./services/items');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// endpoint de ejemplo
app.get('/', (req, res) => {
    res.json({ message: 'Mensaje prueba' });
});

// endpoint login, llama al login.js para obtener los datos del usuario
app.get('/login', async (req, res, next) => {
    console.log(req.query);
    try {
        const resultado = await login.getUserData(req.query.user, req.query.password);
        res.json(resultado);
    } catch (err) {
        console.error('Error while getting data', err.message);
        next(err);
    }
});

// endpoint insertar item, llama al items.js para insertar los datos del item
app.get('/addItem', async (req, res, next) => {
    try {
        const filas = await items.insertData(req);
        if (filas > 0) {
            res.json({ message: 'Datos guardados con éxito', filasAfectadas: filas });
            console.log("Datos guardados con éxito");
        } else {
            res.json({ message: 'No se insertaron datos', filasAfectadas: filas });
            console.log("No se insertaron datos");
        }
    } catch (err) {
        console.error('Error while inserting items', err.message);
        next(err);
    }
});

// endpoint obtener items, llama al items.js para obtener los datos de los items
app.get('/getItems', async (req, res, next) => {
    try {
        const resultado = await items.getData();
        res.json(resultado);
    } catch (err) {
        console.error('Error while getting items', err.message);
        next(err);
    }
});

// endpoint borrar item, llama al items.js para borrar los datos del item
app.get('/deleteItem', async (req, res, next) => {
    try {
        const filas = await items.deleteData(req);
        if (filas > 0) {
            res.json({ message: 'Item eliminado', filasAfectadas: filas });
        } else {
            res.json({ message: 'No se eliminó ningún item', filasAfectadas: filas });
        }
    } catch (err) {
        console.error('Error while deleting items', err.message);
        next(err);
    }
});

//la api escucha por el puerto 3030
const port = 3030
app.listen(port)
console.log('API escuchando en el puerto ' + port);