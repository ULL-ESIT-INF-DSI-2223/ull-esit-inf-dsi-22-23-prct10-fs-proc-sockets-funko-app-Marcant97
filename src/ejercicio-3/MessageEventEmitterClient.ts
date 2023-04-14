// import {connect} from 'net';
import { Socket } from 'dgram';
import {EventEmitter} from 'events';
import {NetConnectOpts, connect} from 'net';
// import { list, eliminar, leer, add, update } from './types.js';
import { RequestType } from './types.js';

export class MessageEventEmitterClient extends EventEmitter {
  
  private connection: any; //! esto tengo que cambiarlo

  constructor(private numero_puerto: number) {
    super();

    this.connection = connect({port: numero_puerto});
    

    // let wholeData = '';
    // this.connection.on('data', (dataChunk: string) => {
    //   wholeData += dataChunk;

    //   let messageLimit = wholeData.indexOf('\n');
    //   while (messageLimit !== -1) {
    //     const message = wholeData.substring(0, messageLimit);
    //     wholeData = wholeData.substring(messageLimit + 1);
    //     this.emit('message', JSON.parse(message));
    //     messageLimit = wholeData.indexOf('\n');
    //   }
    // });
  }

  get getConnection() {
    return this.connection;
  }

  get getNumeroPuerto() {
    return this.numero_puerto;
  }

  // un array con parámetros opcionales
  send(args: RequestType ) {
    
    // el args es un list, entonces mandar mensaje
    // if (args.comando === 'list') {
    //   this.connection.write(JSON.stringify(args));
    // }
    // else if (args.comando === 'remove') {
    //   this.connection.write(JSON.stringify(args));
    // }
    this.connection.write(JSON.stringify(args));

  }

  recieve(): boolean {
    let wholeData = '';
    this.connection.on('data', (data: string) => {
      // wholeData += JSON.parse(data.toString());
      wholeData += data;
      if (JSON.parse(data.toString()).success === false) {
        console.log('Error!');
        return false;
      }
      // console.log(wholeData);
      // console.log('wholeData: ', wholeData);
      let messageLimit = wholeData.indexOf('\n');
      // console.log('messageLimit: ', messageLimit);c
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('message', JSON.parse(message));
        // console.log(message);
        messageLimit = wholeData.indexOf('\n');
      }
      return true;
    });

    return false;

    // let wholeData = '';
    // this.connection.on('data', (dataChunk: string) => {
    //   wholeData += dataChunk;

    //   let messageLimit = wholeData.indexOf('\n');
    //   while (messageLimit !== -1) {
    //     const message = wholeData.substring(0, messageLimit);
    //     wholeData = wholeData.substring(messageLimit + 1);
    //     this.emit('message', JSON.parse(message));
    //     messageLimit = wholeData.indexOf('\n');
    //   }
    // });
  }


  
}



// const client = new MessageEventEmitterClient(connect({port: 60300}));

// client.on('message', (message) => {
//   if (message.type === 'watch') {
//     console.log(`Connection established: watching file ${message.file}`);
//   } else if (message.type === 'change') {
//     console.log('File has been modified.');
//     console.log(`Previous size: ${message.prevSize}`);
//     console.log(`Current size: ${message.currSize}`);
//   } else {
//     console.log(`Message type ${message.type} is not valid`);
//   }
// });