import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import { addFunko, eliminarFunko, listaFunkos, mostrarFunko, modificarFunko } from './funciones.js';
// import { Genero, Tipo, list} from './types.js';
import chalk from 'chalk';

import {connect} from 'net';
import { MessageEventEmitterClient } from './MessageEventEmitterClient.js';
import { Tipo, Genero, RequestType, ResponseType } from './types.js';
import { Funko } from './funko.js';
import { exit } from 'process';



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
    funko: [funko_aux]
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
    funko: [funko_aux]
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
  // console.log(request);
  const serverResponse: ResponseType = request;
  console.log(`Respuesta recibida ${serverResponse.comando}`);
  if(serverResponse.success) {
    console.log(chalk.green(`La petición resultó: ${serverResponse.success}`));
    if(serverResponse.comando === "list") {
      console.log("La colleción es la siguiente:");
      const funkoPops: Funko[] = serverResponse.funko as Funko[];
      funkoPops.forEach((funko) => {
        // let funko_: Funko = new Funko(0, "", "", TiposFunko.POP, GeneroFunko.PELICULAS, "", 1, false, "", 20);
        // funko_ = Object.assign(funko_, funko);
        // funko_.imprimirFunko();
        console.log(funko);
      });
    } 
    else if(serverResponse.comando === "read") {
      if (serverResponse.funko != undefined) {
        if (serverResponse.funko[0].getID === 0) {
          console.log("No existe el funko solicitado");
        }
        else {
          console.log(serverResponse);
          console.log('mi id: ' + serverResponse.funko[0].getID);
          const mi_funko = new Funko(serverResponse.funko[0].getNombre, serverResponse.funko[0].getDescripcion, serverResponse.funko[0].getTipo, serverResponse.funko[0].getGenero, serverResponse.funko[0].getFranquicia, serverResponse.funko[0].getNumero, serverResponse.funko[0].getExclusivo, serverResponse.funko[0].getCaracteristicasEspeciales, serverResponse.funko[0].getValorMercado, serverResponse.funko[0].getID);
          console.log(chalk.white("-----------------------------------"));
          console.log(chalk.white(`ID: ${mi_funko.getID}`));
          console.log(chalk.white(`Nombre: ${mi_funko.getNombre}`));
          console.log(chalk.white(`Descripcion: ${mi_funko.getDescripcion}`));
          console.log(chalk.white(`Tipo: ${mi_funko.getTipo}`));
          console.log(chalk.white(`Genero: ${mi_funko.getGenero}`));
          console.log(chalk.white(`Franquicia: ${mi_funko.getFranquicia}`));
          console.log(chalk.white(`Numero: ${mi_funko.getNumero}`));
          console.log(chalk.white(`Exclusivo: ${mi_funko.getExclusivo}`));
          console.log(chalk.white(`Caracteristicas Especiales: ${mi_funko.getCaracteristicasEspeciales}`));
          if (mi_funko.getValorMercado <= 50) {
            console.log(chalk.green(`Valor de mercado: ${mi_funko.getValorMercado}`));
          }
          else if (mi_funko.getValorMercado > 50 && mi_funko.getValorMercado <= 100) {
            console.log(chalk.yellow(`Valor de mercado: ${mi_funko.getValorMercado}`));
          }
          else if (mi_funko.getValorMercado > 100 && mi_funko.getValorMercado <= 200) {
            console.log(chalk.red(`Valor de mercado: ${mi_funko.getValorMercado}`));
          }    
          else {
            console.log(chalk.blue(`Valor de mercado: ${mi_funko.getValorMercado}`));
          }
        }
      }
      // console.log("El funko solicitado es:");
      // let funko_: Funko = new Funko(0, "", "", TiposFunko.POP, GeneroFunko.PELICULAS, "", 1, false, "", 20);
      // funko_ = Object.assign(funko_, serverResponse.funkoPops);
      // funko_.imprimirFunko()
      // console.log(request);
    }
  } else {
    console.log(chalk.red(`La respuesta fue: ${serverResponse.success}`));
  }
});


