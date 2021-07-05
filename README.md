
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#instalacion">Instalacion</a>
    </li>
    <li><a href="#auth-token">Auth Token</a></li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#postman-collection">Postman collection</a></li>
    <li><a href="#conexion-a-compass">Acceso a la base de datos</a></li>
    <li><a href="#mejoras">Mejoras</a></li>
    <li><a href="#licencia">Licencia</a></li>
  </ol>
</details>



<!-- Acerca del proyecto -->
## Acerca del proyecto


Proyecto para proceso de **REWORTH**, implementacion de la api de Spotify.



### Construido con

* Nodejs
* Expressjs
* Mongodb



<!-- Instalacion -->
## Instalacion

Para poder correr el proyecto local realiza lo siguiente.


1. Clonar el repositorio
   ```sh
   git clone https://github.com/axelbon/reworth-prueba.git
   ```
2. Instalar NPM packages
   ```sh
   npm install
   ```
3. Correr proyecto
   ```sh
   npm start
   ```



<!-- Token -->
## Auth token

La generacion del token se debe realizar manualmente, _el porque lo puedes ver en el apartado de mejoras_<br>
para generar tu token debes ingresar en el siguiente url <br>

_url para generar token_ ``` https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=http://127.0.0.1:3000/&scope=user-read-private%20user-read-email&response_type=token&state=123 ```

Seguir los siguiente pasos:
1. https://developer.spotify.com/dashboard/login
3. Iniciar sesion
2. Cambiar ${client_id} de la url a tu **client_id**
3. Crear una app, y añadir ``` http://127.0.0.1:3000/ ``` como redirect uri en la configuracion
4. Cuando se ingrese a el link de **authorize** el url de redireccion tendra el token que se utilizara en el uso de la api

<!-- USO -->
## Uso

El token de spotify sera ingresado en los endpoints que lo requieran como el header **spotify-token** <br>
Los endpoints que realizan busqueda en la api de spotify tienen un parametro necesario ( _puedes consultarlo en la collecion de postman_ )



<!-- POSTMAN COLLECTION -->
## Postman collection

Para importar la collecion de postman puedes realizarlo con el siguiente link: https://www.postman.com/collections/171de1db185acd964ff0


<!-- mejoras -->
## Mejoras

1. Como primera mejora seria la implementacion mas amigable de obtener el token, realizando una pequeña vista para poder obtener el token y de esa manera poder utilizarlo mas facil.

2. Refactorizar el manejo de errores al hacer consultas o incersiones a la base de datos

3. Refactorizar la manera del manejo de rutas e implementar controllers para tener una mejor estructura del proyecto.

<!-- compass-connection -->
## Conexion a compass

Puedes ingresar a la gestion de la base de datos a travez de **MongoDB Compass**, con el siguiente uri: ``` mongodb+srv://dbUserAxel:dNR74A7C6q8kU1iP@reworth-cluster.jgsz0.mongodb.net/test?authSource=admin&replicaSet=atlas-2fpngf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true ```

<!-- licencia -->
## Licencia

Distributed under the MIT License. See `LICENSE` for more information.
