const express = require('express');
const body_parser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(body_parser.urlencoded({ extended: false}));
app.use(body_parser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'my_db'
});
connection.connect();

 
//ENDPOINTS

app.get('/pedido', (req, res) => {
    var idPedido = req.query.idPedido;
    var query = "SELECT id, price, creationDate, state, paymentType \
         FROM pedido \
         WHERE id = ?";
         
    connection.query(query, [idPedido], function (error, results) {
        if (error) throw error;

        if(results.length > 0){
            pedido = results[0];
            res.status(200).send({
                id: pedido.id,
                price: pedido.price,
                description: "en un futuro habrá respuestas",
                state: pedido.state,
                creationDate: pedido.creationDate,                
                paymentType: pedido.paymentType,
                // productos: ???
            });
        } else {
            res.status(400).send("No se encontro el pedido");
        }
    });
});

app.post('/pedido', (req, res) => {
    var idUsuarix = req.body.idUsuarix;

    res.status(200).send({
        msg: `La accion ha sido exitosa`
    });
});

app.put('/estadoPedido', (req, res) => {

});

app.post('/login', (req, res) => {

});

app.post('/sign-up', (req, res) => {

});

app.get('/pedidoUsuarix', (req, res) => {
    var idUsuarix = req.query.idUsuarix;
    var query = "SELECT id, price, creationDate, state, paymentType \
         FROM pedido \
         WHERE id = ?";

         if ((query = 'state = "Entregado"') => {
            var listaPedido = []
            //agregar pedidos anteriores
            if (listaPedido.length > 0) {
                listaPedido[0]
            }
         });

         // A REVISAR E INDENTAR
        connection.query(query, [idPedido], function (error, results) {
           if (error) throw error;
    
           if(results.length > 0){
               pedido = results[0];
               res.status(200).send({
                   id: pedido.id,
                   price: pedido.price,
                   description: "en un futuro habrá respuestas",
                   state: pedido.state,
                   creationDate: pedido.creationDate,                
                   paymentType: pedido.paymentType,
                    // productos: ???
                });
            } else {
                res.status(400).send("No se encontro el pedido");
            }
        });
});

app.post('/favoritos', (req, res) => {

});

app.get('/favoritos', (req, res) => { //es una lista de favs???
    var idProducto = req.query.idProducto;
    var query = "SELECT id, nombre, precio \
         FROM producto \
         WHERE id = ?";
         
    connection.query(query, [idPedido], function (error, results) {
        if (error) throw error;

        if(results.length > 0){
            pedido = results[0];
            res.status(200).send({
                id: producto.id,
                nombre: producto.nombre,
                price: producto.price,
                //description: "en un futuro habrá respuestas",
            });
        } else {
            res.status(400).send("No se encontro el producto");
        }
    });
});

app.post('/producto', (req, res) => {

});

app.get('/producto', (req, res) => {
    var idProducto = req.query.idProducto;
    var query = "SELECT id, nombre, nombreCorto, precio \
         FROM producto \
         WHERE id = ?";
         
    connection.query(query, [idPedido], function (error, results) {
        if (error) throw error;

        if(results.length > 0){
            pedido = results[0];
            res.status(200).send({
                id: producto.id,
                nombre: producto.nombre,
                price: producto.price,
                //description: "en un futuro habrá respuestas",
            });
        } else {
            res.status(400).send("No se encontro el producto");
        }
    });
});

app.put('/producto', (req, res) => {

});

app.delete('/producto', (req, res) => {

});








app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

//connection.end()