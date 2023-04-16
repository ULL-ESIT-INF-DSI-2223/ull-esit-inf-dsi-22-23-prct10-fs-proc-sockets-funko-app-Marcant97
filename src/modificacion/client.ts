import {connect} from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv)).command('command', 'Comando a ejecutar de la forma [comando --opciones <opciones>] ', {
  comando: {
    describe: 'Comando a ejecutar',
    demandOption: true,
    type: 'string'
  },
  fichero: {
    describe: 'Fichero a procesar',
    demandOption: true,
    type: 'string'
  },
  opciones: {
    describe: 'Opciones del comando',
    demandOption: false,
    type: 'string'
  }
}, (argv) => {

  const client = (connect({port: 60300}));
  client.write(JSON.stringify({comando: argv.comando, fichero: argv.fichero, opciones: argv.opciones}));
  console.log('comando enviado al servidor');
  console.log('respuesta: ');
  // cliente recibe la respuesta del servidor
  client.on('data', (message) => {
    console.log('desde el cliente: ' + message.toString());
  });

  client.on('end', () => {
    console.log('desconectado del servidor');
  });

}).help().argv;

