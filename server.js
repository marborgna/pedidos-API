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
    var query = "SELECT pedido.id, price, creationDate, state, paymentType, \
            GROUP_CONCAT(pedido_producto.idProducto) as productos, \
            GROUP_CONCAT(pedido_producto.cantidad) as productos_cantidad \
         FROM pedido \
         LEFT JOIN pedido_producto ON pedido.id = pedido_producto.idPedido \
         WHERE pedido.id = ? \
         GROUP BY pedido.id";
         
    connection.query(query, [idPedido], function (error, results) {
        if (error) throw error;

        if(results.length > 0){
            pedido = results[0];
            var productos = pedido.productos.split(",");
            var cantidades = pedido.productos_cantidad.split(",");
            var producto_cantidad = [];
            for (let j = 0; j < productos.length; j++) {
                producto_cantidad.push({
                    idProducto: parseInt(productos[j]),
                    quantity: parseInt(cantidades[j])
                });
            }
            res.status(200).send({
                id: pedido.id,
                price: pedido.price,
                state: pedido.state,
                creationDate: pedido.creationDate,                
                paymentType: pedido.paymentType,
                productos: producto_cantidad
            });
        } else {
            res.status(400).send("No se encontro el pedido");
        }
    });
});

app.post('/pedido', (req, res) => {
    var paymentType = req.body.paymentType;
    var idUsuario = req.body.idUsuario;
    var direccion = req.body.address;
    var productos = req.body.productos;

    var price = 0;  //FALTAN ACTUALIZAR EL price (actualizar BD, modificar pedido)
    var query = 'INSERT INTO pedido (idUsuario, paymentType, direccion, state, price) \
        VALUES (?, ?, ?, "Entregado", ?)';
    connection.query(query, [idUsuario, paymentType, direccion, price], function (error, results) {
        if (error) throw error;
        var idPedido = results.insertId;

        var query = 'INSERT INTO pedido_producto (idPedido, idProducto, cantidad) \
            VALUES ';
        //INSERTAR VALORES DE PRODUCTOS DEL PEDIDO
        for (let i = 0; i < productos.length; i++) {
            query += '(' + idPedido + ', ' + parseInt(productos[i].idProducto) + ', ' + parseInt(productos[i].quantity) + '), ';
        }
        connection.query(query, function (error, results) {
            if (error) throw error;

            // Escribir un SELECT que dado un idPedido calcule el precio a partir de los productos (hacer un JOIN x 2 tablas pedido_producto, producto)

            res.status(200).send({
                answer: `La accion ha sido exitosa`,
                idPedido: idPedido
            });
        });
    });
});

app.put('/estadoPedido', (req, res) => {

});

app.post('/login', (req, res) => {

});

app.post('/sign-up', (req, res) => {

});

app.get('/pedidosUsuarix', (req, res) => {
    var idUsuarix = req.query.idUsuarix;
    var query = "SELECT pedido.id, price, creationDate, state, paymentType, \
            GROUP_CONCAT(pedido_producto.idProducto) as productos, \
            GROUP_CONCAT(pedido_producto.cantidad) as productos_cantidad \
         FROM pedido \
         LEFT JOIN pedido_producto ON pedido.id = pedido_producto.idPedido \
         WHERE state = 'Entregado' \
         AND idUsuario = ? \
         GROUP BY pedido.id";

         
    connection.query(query, [idUsuarix], function (error, results) {
        if (error) throw error;

        var listaPedidosEntregado = []; 

        for (let i = 0; i < results.length; i++) {
            var pedido = results[i];
            var productos = pedido.productos.split(",");
            var cantidades = pedido.productos_cantidad.split(",");
            var producto_cantidad = [];
            for (let j = 0; j < productos.length; j++) {
                producto_cantidad.push({
                    idProducto: parseInt(productos[j]),
                    quantity: parseInt(cantidades[j])
                });
            }

            listaPedidosEntregado.push({
                id: pedido.id,
                price: pedido.price,
                creationDate: pedido.creationDate,  
                state: pedido.state,
                paymentType: pedido.paymentType,
                productos: producto_cantidad
            });
        }

        res.status(200).send(listaPedidosEntregado);
    
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