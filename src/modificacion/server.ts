import net from 'net';
import {spawn} from 'child_process';


net.createServer((connection) => {
  console.log('A client has connected.');
  // avisarle que está conectado
  let salida2 = 'nada';
  connection.on('data', (message) => {
    console.log('A client has sent a message.');  
    // se recibe en formato json
    const mensaje = JSON.parse(message.toString());
      console.log('comando:' + mensaje.comando);
      console.log('fichero: ' + mensaje.fichero);
      console.log('opciones: ' + mensaje.opciones);
      if (mensaje.opciones === undefined) {
        const salida = spawn(mensaje.comando, [mensaje.fichero]);
        salida2 = salida.stdout.pipe(process.stdout).toString();
      }
      connection.write(salida2);
      console.log('mensaje enviado' + salida2);
      connection.end();
  });

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
