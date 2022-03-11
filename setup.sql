DROP database IF EXISTS my_db;
CREATE database IF NOT EXISTS my_db;
USE my_db;

CREATE TABLE producto (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre TEXT,
    nombreCorto TEXT,
    precio INTEGER
);

CREATE TABLE pedido (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    idUsuario INTEGER,
    paymentType TEXT,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccion TEXT,
    state TEXT,
    price INTEGER
);

CREATE TABLE pedido_producto (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    idPedido INTEGER,
    idProducto INTEGER,
    cantidad INTEGER
);

CREATE TABLE usuario (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    userName TEXT,
    mail TEXT,
    direccion TEXT,
    telefono INTEGER,
    userPassword TEXT
);


INSERT INTO producto VALUES (1, "Hamburguesa clásica", "HamClas", 650);
INSERT INTO producto VALUES (2, "Sandwich veggie", "SandVegg", 520);
INSERT INTO producto VALUES (3, "Focaccia", "Foca", 410);
INSERT INTO producto VALUES (4, "Sandwich queso", "SandQ", 580);
INSERT INTO producto VALUES (5, "Lata cerveza", "Cerv", 250);
INSERT INTO producto VALUES (6, "Hamburguesa con jamón", "HamJam", 695);
INSERT INTO producto VALUES (7, "Hamburguesa  especial", "HamEsp", 710);


INSERT INTO pedido (id, idUsuario, paymentType, direccion, state, price)
    VALUES (1, 43, "Tarjeta Debito", "Av Siempreviva 1234", "Entregado", 650);
INSERT INTO pedido_producto (idPedido, idProducto, cantidad)
    VALUES (1, 4, 2);

INSERT INTO pedido (id, idUsuario, paymentType, direccion, state, price)
    VALUES (2, 55, "Efectivo", "Av las Rosas 444", "Preparando", 550);

INSERT INTO pedido (id, idUsuario, paymentType, direccion, state, price)
    VALUES (3, 23, "Tarjeta Credito", "Calle Falsa 123", "Entregado", 800)


-----------------

SELECT id as idPedido, state
    FROM pedido
    WHERE pedido.state = "entregado";

SELECT pedido_producto.idProducto, cantidad
    FROM pedido
    JOIN pedido_producto 
    ON pedido_producto.idProducto = pedido.id
    WHERE pedido.id = 1;


SELECT usuario.name, pedido.creationDate
    FROM pedido
    JOIN usuario
    ON pedido.idUsuario = usuario.id