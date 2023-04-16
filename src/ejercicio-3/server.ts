import net from 'net';
import { addFunko, eliminarFunko, listaFunkos, mostrarFunko, modificarFunko } from './funciones.js';
import { Funko } from './funko.js';
import { ResponseType } from './types.js';
import { json } from 'stream/consumers';


net.createServer((connection) => {
  console.log('A client has connected.');

  connection.on('data', (data) => {

    if (JSON.parse(data.toString()).comando === 'list') {
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const lista_funkos: Funko[] = listaFunkos(user);

      if (lista_funkos.length === 0) {
        const respuesta: ResponseType = {
          comando: 'list',
          success: false,
          cadena: 'No hay Funkos en la colección'
        };
        connection.write(JSON.stringify(respuesta) + '\n');
      }
      else {
        const respuesta: ResponseType = {
          comando: 'list',
          success: true,
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
      const funko_id = JSON.parse(data.toString()).id;
      console.log('funko_id: ' + funko_id);
      console.log('user: ' + user);
      console.log('comando: ' + comando);
      const resultado = eliminarFunko(user, funko_id);

      if (resultado === true) {
        const respuesta: ResponseType = {
          comando: 'remove',
          success: true,
          cadena: 'Funko eliminado correctamente'
        };
        connection.write(JSON.stringify(respuesta) + '\n');
      }
      else {
        const respuesta: ResponseType = {
          comando: 'remove',
          success: false,
          cadena: 'Funko no encontrado, no se ha podido eliminar.'
        };
        connection.write(JSON.stringify(respuesta) + '\n');
      }
      
      // connection.write(JSON.stringify({message: 'Funko eliminado!', success: true}));
    }
    else if (JSON.parse(data.toString()).comando === 'read') {
      const comando = JSON.parse(data.toString()).comando;
      const user = JSON.parse(data.toString()).user;
      const funko_id = JSON.parse(data.toString()).id;
      const salida = mostrarFunko(user, funko_id);
      // si salida es un funko
      if (typeof salida === 'object' && salida !== null) {
        // if (salida.getID === 0) {
        //   const respuesta: ResponseType = {
        //     comando: 'read',
        //     success: false,
        //     cadena: 'Funko no encontrado'
        //   };
        //   connection.write(JSON.stringify(respuesta) + '\n');
        // }
        // else {
          const respuesta: ResponseType = {
            comando: 'read',
            success: true,
            funko: [salida]
          };
          console.log(respuesta);
          connection.write(JSON.stringify(respuesta) + '\n');
        // }
      }
      else {
        const respuesta: ResponseType = {
          comando: 'read',
          success: false,
          cadena: salida
        };
        connection.write(JSON.stringify(respuesta) + '\n');
      }
    }
    else if (JSON.parse(data.toString()).comando === 'add') {
      const salida = addFunko(JSON.parse(data.toString()));
      connection.write(JSON.stringify(salida) + '\n');
    }
    else if (JSON.parse(data.toString()).comando === 'update') {
      const salida = modificarFunko(JSON.parse(data.toString()));
      connection.write(JSON.stringify(salida) + '\n');
      
    }
    connection.emit('request');
  });

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });

  connection.on('request', () => {
    // cerrar conexión con el cliente
    console.log('Cerrando la conexión');
    connection.end();
  });

}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});




