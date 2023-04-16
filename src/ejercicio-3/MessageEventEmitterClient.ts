// import {connect} from 'net';
// import { Socket } from 'dgram';
import {EventEmitter} from 'events';
import {NetConnectOpts, connect, Socket} from 'net';
import { RequestType } from './types.js';


export class MessageEventEmitterClient extends EventEmitter {
  
  private connection: Socket;

  constructor(private numero_puerto: number) {
    super();
    this.connection = connect({port: numero_puerto});
  }

  get getConnection() {
    return this.connection;
  }

  get getNumeroPuerto() {
    return this.numero_puerto;
  }

  // un array con parámetros opcionales
  send(args: RequestType ) {
    this.connection.write(JSON.stringify(args));
    return true;
  }

  recieve(): boolean {
    let wholeData = '';
    this.connection.on('data', (data: string) => {
      wholeData += data;
      if (JSON.parse(data.toString()).success === false) {
        console.log(JSON.parse(data.toString()).cadena);
        return false;
      }
      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('message', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
      return true;
    });

    return false;
  }  
}
