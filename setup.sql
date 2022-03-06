DROP database IF EXISTS my_db;
CREATE database IF NOT EXISTS my_db;

CREATE table IF NOT EXISTS producto (id INTEGER PRIMARY KEY, nombre TEXT, nombreCorto TEXT, precio INTEGER);
CREATE table IF NOT EXISTS pedido (id INTEGER PRIMARY KEY, cantidad INTEGER, formaPago INTEGER, direccion TEXT, estado TEXT, pago INTEGER);
CREATE table IF NOT EXISTS usuario (id INTEGER PRIMARY KEY, name TEXT, userName TEXT, mail TEXT, direccion TEXT, telefono INTEGER, userPassword TEXT);


INSERT INTO producto VALUES (1, "Hamburguesa clásica", "HamClas", 650);
INSERT INTO producto VALUES (2, "Sandwich veggie", 520);
INSERT INTO producto VALUES (3, "Focaccia", 410);
INSERT INTO producto VALUES (4, "Sandwich queso", 580);
INSERT INTO producto VALUES (5, "Lata cerveza", 250);
INSERT INTO producto VALUES (6, "Hamburguesa con jamón", 695);
INSERT INTO producto VALUES (7, "Hamburguesa  especial", 710);


INSERT INTO pedido VALUES (1, "1 hamClas", 600, 73, "Tarjeta Debito", "Av Siempreviva 1234", "Nuevo", 650)




SELECT estado FROM pedido
    JOIN preferencias
    ON pedido.id = preferencias.id
    WHERE pedido.estado = "entregado";