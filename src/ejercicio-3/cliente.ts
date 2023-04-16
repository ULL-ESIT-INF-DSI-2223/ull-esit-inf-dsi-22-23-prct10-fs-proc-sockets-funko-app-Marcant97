import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import { addFunko, eliminarFunko, listaFunkos, mostrarFunko, modificarFunko } from './funciones.js';
// import { Genero, Tipo, list} from './types.js';
import chalk from 'chalk';

import {connect} from 'net';
import { MessageEventEmitterClient } from './MessageEventEmitterClient.js';
import { Tipo, Genero, RequestType, ResponseType } from './types.js';
import { Funko } from './funko.js';


const client = new MessageEventEmitterClient(60300);


/**
 * add
 * --user 
 * --id
 * --nombre
 * --descripcionS
 * --tipo
 * --genero
 * --franquicia
 * --numero
 * --exclusivo
 * --caracteristicasEspeciales
 * --valorMercado
 */
yargs(hideBin(process.argv)).command('add', 'Adds a funko', {
  user: {
    description: 'User name',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'Funko ID',
    type: 'number',
    demandOption: true
  },
  nombre: {
    description: 'Funko name',
    type: 'string',
    demandOption: true
  },
  descripcion: {
    description: 'Funko description',
    type: 'string',
    demandOption: true
  },
  tipo: {
    description: 'Funko type',
    type: 'string',
    demandOption: true
  },
  genero: {
    description: 'Funko genre',
    type: 'string',
    demandOption: true
  },
  franquicia: {
    description: 'Funko franchise',
    type: 'string',
    demandOption: true
  },
  numero: {
    description: 'Funko number',
    type: 'number',
    demandOption: true
  },
  exclusivo: {
    description: 'Funko exclusive',
    type: 'boolean',
    demandOption: true
  },
  caracteristicasEspeciales: {
    description: 'Funko special features',
    type: 'string',
    demandOption: true
  },
  valorMercado: {
    description: 'Funko market value',
    type: 'number',
    demandOption: true
  }
}, (argv) => {
  // addFunko(argv.id, argv.user, argv.nombre, argv.descripcion, argv.tipo as Tipo, argv.genero as Genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado);
  const funko_aux = new Funko(argv.nombre, argv.descripcion, argv.tipo as Tipo, argv.genero as Genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado, argv.id)
  const agregar: RequestType = {
    comando: 'add',
    user: argv.user,
    funko: [funko_aux],
    nombre: argv.nombre,
    id: argv.id
  }
  client.send(agregar);
  client.recieve();

}).help().argv;


/**
 * remove
 * --user
 * --id
 */
yargs(hideBin(process.argv)).command('remove', 'Removeses a funko', {
  user: {
    description: 'User name',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'Funko ID',
    type: 'number',
    demandOption: true
  }
}, (argv) => {
  // eliminarFunko(argv.user, argv.id);
  const borrar: RequestType = {
    comando: 'remove',
    user: argv.user,
    id: argv.id
  }

  client.send(borrar);
  client.recieve();
}).help().argv;


/**
 * update
 * --user 
 * --id
 * --nombre
 * --descripcion
 * --tipo
 * --genero
 * --franquicia
 * --numero
 * --exclusivo
 * --caracteristicasEspeciales
 * --valorMercado
 */
yargs(hideBin(process.argv)).command('update', 'Modifies a funko', {
  user: {
    description: 'User name',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'Funko ID',
    type: 'number',
    demandOption: true
  },
  nombre: {
    description: 'Funko name',
    type: 'string',
    demandOption: true
  },
  descripcion: {
    description: 'Funko description',
    type: 'string',
    demandOption: true
  },
  tipo: {
    description: 'Funko type',
    type: 'string',
    demandOption: true
  },
  genero: {
    description: 'Funko genre',
    type: 'string',
    demandOption: true
  },
  franquicia: {
    description: 'Funko franchise',
    type: 'string',
    demandOption: true
  },
  numero: {
    description: 'Funko number',
    type: 'number',
    demandOption: true
  },
  exclusivo: {
    description: 'Funko exclusive',
    type: 'boolean',
    demandOption: true
  },
  caracteristicasEspeciales: {
    description: 'Funko special features',
    type: 'string',
    demandOption: true
  },
  valorMercado: {
    description: 'Funko market value',
    type: 'number',
    demandOption: true
  }
}, (argv) => {
  // modificarFunko(argv.id, argv.user, argv.nombre, argv.descripcion, argv.tipo as Tipo, argv.genero as Genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado);
  const funko_aux = new Funko(argv.nombre, argv.descripcion, argv.tipo as Tipo, argv.genero as Genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado, argv.id)
  const modificar: RequestType = {
    comando: 'update',
    user: argv.user,
    funko: [funko_aux],
    nombre: argv.nombre,
    id: argv.id
  }
  client.send(modificar);
  client.recieve();
}).help().argv;


/**
 * list
 * --user
 */
yargs(hideBin(process.argv)).command('list', 'Lists a funko', {
  user: {
    description: 'User name',
    type: 'string',
    demandOption: true
  }
}, (argv) => {
  // listaFunkos(argv.user);

  // mandar un mensaje al servidor para que me devuelva la lista de funkos
  const list1: RequestType = {
    comando: 'list',
    user: argv.user
  }
  client.send(list1);
  const result = client.recieve();
  // exit(0);


}).help().argv;


/**
 * read
 * --user
 * --id
 */
yargs(hideBin(process.argv)).command('read', 'Reads a funko', {
  user: {
    description: 'User name',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'Funko ID',
    type: 'number',
    demandOption: true
  }
}, (argv) => {
  // mostrarFunko(argv.user, argv.id);
  const read1: RequestType = {
    comando: 'read',
    user: argv.user,
    id: argv.id
  }
  client.send(read1);
  client.recieve();
  
}).help().argv;




client.on('message', (request) => {

  const serverResponse: ResponseType = request;

  if(serverResponse.success) {  // si el comando se ha ejecutado correctamente
    if(serverResponse.comando === "list") {
      const funkoPops: Funko[] = serverResponse.funko as Funko[];
      funkoPops.forEach((funko) => {
        console.log(chalk.white(JSON.stringify(funko)));
      });
    } 
    else if(serverResponse.comando === "read") {
      // if (serverResponse.funko != undefined) {
        const array_funkos = serverResponse.funko as Funko[];
        const mi_funko = array_funkos[0];
        console.log(chalk.white(JSON.stringify(mi_funko)));
      // }
      
    }
    else { // para el resto de comandos que sólo reciben una cadena como respuesta.
      console.log(chalk.green(`Respuesta: ${serverResponse.cadena}`));
    }
  } 
  else { // si el comando no se ha ejecutado correctamente
    console.log(chalk.red(`Respuesta: ${serverResponse.cadena}`));
  }
});


