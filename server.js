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

 
// EJEMPLOS ENDPOINTS


app.get('/pedido', (req, res) => {
});

app.post('/pedido', (req, res) => {

    res.status(200).send({
        msg: ``
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});







connection.end()