import net from 'net';
// import { RequestType, ResponseType } from './types.js';
import { json } from 'node:stream/consumers';
import { addFunko, eliminarFunko, listaFunkos, mostrarFunko, modificarFunko } from './funciones.js';
import { Funko } from './funko.js';
import { Genero, Tipo, ResponseType } from './types.js';


net.createServer((connection) => {
  console.log('A client has connected.');

  // recibimos un request type
  connection.on('data', (data) => {
    console.log("Datos recibidos:");
    console.log(JSON.parse(data.toString()));

    if (JSON.parse(data.toString()).comando === 'list') {
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const lista_funkos: Funko[] = listaFunkos(user);
      let resultado = true;
      if (lista_funkos.length === 0) {
        resultado = false;
      }
      else {
        const respuesta: ResponseType = {
          comando: 'list',
          success: resultado,
          funko: lista_funkos
        };

        console.log(respuesta.comando);
        connection.write(JSON.stringify(respuesta) + '\n');

      }
      console.log('Fin de los mensajes');
    }
    else if (JSON.parse(data.toString()).comando === 'remove') {
      console.log(JSON.parse(data.toString()));
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const funko_id = JSON.parse(data.toString()).funko_id;
      console.log('funko_id: ' + funko_id);
      console.log('user: ' + user);
      console.log('comando: ' + comando);
      const resultado = eliminarFunko(user, funko_id);

      const respuesta: ResponseType = {
        comando: 'remove',
        success: resultado,
      };
      connection.write(JSON.stringify(respuesta) + '\n');
      
      // connection.write(JSON.stringify({message: 'Funko eliminado!', success: true}));
    }
    else if (JSON.parse(data.toString()).comando === 'read') {
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const funko_id = JSON.parse(data.toString()).id;
      const funko = mostrarFunko(user, funko_id);
      // connection.write(JSON.stringify(funko));
      if (funko.getID === 0) {
        const respuesta: ResponseType = {
          comando: 'read',
          success: true,
          cadena: 'Funko no encontrado'
        };
        connection.write(JSON.stringify(respuesta) + '\n');

      }
      else {
        const respuesta: ResponseType = {
          comando: 'read',
          success: true,
          funko: [funko]
        };
        connection.write(JSON.stringify(respuesta) + '\n');
      }
    }
    else if (JSON.parse(data.toString()).comando === 'add') {
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const id = JSON.parse(data.toString()).funko.ID;
      const nombre = JSON.parse(data.toString()).funko.nombre;
      const descripcion = JSON.parse(data.toString()).funko.descripcion;
      const tipo = JSON.parse(data.toString()).funko.tipo;
      const genero = JSON.parse(data.toString()).funko.genero;
      const franquicia = JSON.parse(data.toString()).funko.franquicia;
      const numero = JSON.parse(data.toString()).funko.numero;
      const exclusivo = JSON.parse(data.toString()).funko.exclusivo;
      const caracteristicasEspeciales = JSON.parse(data.toString()).funko.caracteristicasEspeciales;
      const valorMercado = JSON.parse(data.toString()).funko.valorMercado;

      const salida = addFunko(id, user, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado);
      const respuesta: ResponseType = {
        comando: 'add',
        success: true,
        cadena : salida
      };
      connection.write(JSON.stringify(respuesta) + '\n');
      // connection.write(JSON.stringify(salida));
      // connection.write(JSON.stringify({message: salida, success: true}));
    }
    else if (JSON.parse(data.toString()).comando === 'update') {
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const id = JSON.parse(data.toString()).funko.ID;
      const nombre = JSON.parse(data.toString()).funko.nombre;
      const descripcion = JSON.parse(data.toString()).funko.descripcion;
      const tipo = JSON.parse(data.toString()).funko.tipo;
      const genero = JSON.parse(data.toString()).funko.genero;
      const franquicia = JSON.parse(data.toString()).funko.franquicia;
      const numero = JSON.parse(data.toString()).funko.numero;
      const exclusivo = JSON.parse(data.toString()).funko.exclusivo;
      const caracteristicasEspeciales = JSON.parse(data.toString()).funko.caracteristicasEspeciales;
      const valorMercado = JSON.parse(data.toString()).funko.valorMercado;

      const salida = modificarFunko(id, user, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado);
      const respuesta: ResponseType = {
        comando: 'update',
        success: true,
        cadena : salida
      };
      connection.write(JSON.stringify(respuesta) + '\n');
      // connection.write(JSON.stringify(salida));
      // connection.write(JSON.stringify({message: salida, success: true}));
    }

    // emitir un request
    connection.emit('request');

  });


  connection.on('close', () => {
    console.log('A client has disconnected.');
  });

  connection.on('request', () => {
    // cerrar conexión con el cliente
    console.log('cerrando la conexión');
    connection.end();
  });



}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});




