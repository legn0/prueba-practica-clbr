# Repositorio de prueba de postulacion a practica.

Para sql y python: se usara una aplicacion flask simple, con base de datos sqlite3 (para terminos de esta entrega, se obviara el uso de un venv). El url al servudor de flask es el por defecto, es decir, 127.0.0.1:5000.

la aplicacion de react carga en el puerto localhost:3000 (el por defecto)

La estructura de este proyecto es

- prueba-practica-clbra: carpeta con la aplicacion de react (pregunta 3.b)
- python-sql: carpeta con el codigo de python (pregunta 1, 2 y 3.a)
  \*database contiene la archivo con la base de datos sqlite3 a utilizar, se asume que esta esta populada. El archivo se llama Mercados.db

La pregunta 2 será contestada en un archivo .txt en la carpeta python-sql.

## Detalles y supuestos sobre las tablas:

### Market:

\*Name: es un TEXT. PK

(Se asume que el nombre de cada mercado es unico)

### Product:

*Name: es un TEXT
*SKU: es alfanumerico, es un TEXT. PK
*Ean: es alfanumerico, es un TEXT.
*market_name: asumiendo que no es posible obtener el mercado conociendo el SKU y Ean, se agrega una clave foranea correspondiente al nombre del merrcado, es Text. FK

(se considera SKU como la PK asumiendo que cada mercado tiene formatos de SKU distintos impidiendo que coinsidan dos SKUs)

### Price:

*normal_price: es INTEGER
*discount_price: es el precio despues del descuento, si no se han realizado descuentos (i.e, el precio sigue siendo el inicial), es igual a normal_price, es INTEGER.
*active: es INTEGER (sqlite3 no tiene un tipo dedicaco a bools, 0 es Falso y 1 Verdadero).
*create_date: es la fecha en que se creo el Price, es TEXT YYYY-MM-DD (similar a los booleanos, no existe tipo de dato DATE en sqlite3). PK
\*SKU: es el SKU del producto al que le corresponde el precio, es TEXT. PFK

(Se considera la clave primaria compuesta de SKU y create_date pues con el SKU no es suficiente, ya que el precio de un producto puede cambiar multiples veces. Se asume que el precio de un producto puede cambiar a lo mas un avez por dia, en caso contrario se hace necesario que create_date contenga la hora)

## Notas adicionales:

Para probar la aplicacion hay que correr el servidor de flask, ejecutando main.py en la carpeta python-sql, y la aplicacion de react, ejecutando npm start en la carpeta prueba-practica-clbra.

Inicialmente se ve vacio, al ingresar cualquier cosa a la barra de busqueda y borrandolo aparecen los datos. Luego de eso el filtro dunciona correctamente, filtrando los nombres que no contengan el string buscado. Al modificar el contenido de la barra de busqueda se "resetea el filtro", para que se vean los elementos ocultandose uno a uno por segundo.

db_definition.py contiene las queries de sql para la creacion de tablas e incersion de datos a la base de datos
