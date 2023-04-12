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
  // no puedo usar pipe
  const wc11 = spawn('cat', [argv.nombre]);
  
  if (argv.lineas) {
    const wc12 = spawn('wc', ['-l']);
    wc11.stdout.on('data', (data) => {
      wc12.stdin.write(data);
    });
    wc11.stdout.on('end', () => {
      wc12.stdin.end();
    });
    wc12.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    // wc12.on('exit', (code) => {
      //     wc11.kill();
      //     wc22.kill();
      //     wc32.kill();
      //     process.exit(code as number);
      // });
    }
    
  if (argv.palabras) {
    const wc22 = spawn('wc', ['-w']);
    wc11.stdout.on('data', (data) => {
        wc22.stdin.write(data);
    });
    wc11.stdout.on('end', () => {
        wc22.stdin.end();
    });
    wc22.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
      // wc22.on('exit', (code) => {
        //     wc11.kill();
        //     wc12.kill();
        //     wc32.kill();
        //     process.exit(code as number);
        // });
      }
      
  if (argv.caracteres) {
    const wc32 = spawn('wc', ['-c']);
    wc11.stdout.on('data', (data) => {
      wc32.stdin.write(data);
    });
    wc11.stdout.on('end', () => {
        wc32.stdin.end();
    });
    wc32.stdout.on('data', (data) => {
        process.stdout.write(data);
    });
    // wc32.on('exit', (code) => {
    //     wc11.kill();
    //     wc12.kill();
    //     wc22.kill();
    //     process.exit(code as number);
    // });
  }


  if(!argv.lineas && !argv.palabras && !argv.caracteres) {
    console.log("Se debe especificar al menos una opción [--lineas] [--palabras] [--caracteres]");
    // wc11.kill();
    // wc12.kill();
    // wc22.kill();
    // wc32.kill();
    // process.exit(1);
  }
}).help().argv;