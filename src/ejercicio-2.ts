// parámetros de yargs
// ruta del fichero a examinar
// desea ver el numero de lineas, palabas, caracteres o combinaciones de ellos


import {watchFile} from 'fs';
import {spawn} from 'child_process';

console.log("Número de líneas: ");
console.log("Número de palabras: ");
console.log("Número de caracteres: ");

const wc11 = spawn('cat', ['prueba.txt']);
const wc12 = spawn('wc', ['-l']);
wc11.stdout.pipe(wc12.stdin);
wc12.stdout.pipe(process.stdout);


// const wc21 = spawn('cat', ['prueba.txt']);
const wc22 = spawn('wc', ['-w']);
wc11.stdout.pipe(wc22.stdin);
wc22.stdout.pipe(process.stdout);


// const wc31 = spawn('cat', ['prueba.txt']);
const wc32 = spawn('wc', ['-c']);
wc11.stdout.pipe(wc32.stdin);
wc32.stdout.pipe(process.stdout);
