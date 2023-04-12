import {spawn} from 'child_process';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv)).command('file', 'Muestra el número de líneas, palabras o caracteres de un fichero', {
  nombre: {
    description: 'nombre del fichero',
    type: 'string',
    demandOption: true
  },
  lineas: {
    description: 'numero de lineas',
    type: 'boolean',
    demandOption: false
  },
  palabras: {
    description: 'numero de palabras',
    type: 'boolean',
    demandOption: false
  },
  caracteres: {
    description: 'numero de caracteres',
    type: 'boolean',
    demandOption: false
  }
}, (argv) => {
  const wc11 = spawn('cat', [argv.nombre]);
  if (argv.lineas) {
    const wc12 = spawn('wc', ['-l']);
    wc11.stdout.pipe(wc12.stdin);
    wc12.stdout.pipe(process.stdout);
  }
  if (argv.palabras) {
    const wc22 = spawn('wc', ['-w']);
    wc11.stdout.pipe(wc22.stdin);
    wc22.stdout.pipe(process.stdout);
  }
  if (argv.caracteres) {
    const wc32 = spawn('wc', ['-c']);
    wc11.stdout.pipe(wc32.stdin);
    wc32.stdout.pipe(process.stdout);
  }
  if(!argv.lineas && !argv.palabras && !argv.caracteres) {
    console.log("Se debe especificar al menos una opción [--lineas] [--palabras] [--caracteres]");
  }
}).help().argv;