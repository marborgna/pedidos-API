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

});

app.post('/producto', (req, res) => {

});

app.get('/producto', (req, res) => {

});

app.put('/producto', (req, res) => {

});

app.delete('/producto', (req, res) => {

});








app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

//connection.end()