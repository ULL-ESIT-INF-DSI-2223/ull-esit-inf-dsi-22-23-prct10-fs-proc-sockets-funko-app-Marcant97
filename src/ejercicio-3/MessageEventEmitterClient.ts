// import {connect} from 'net';
// import { Socket } from 'dgram';
import {EventEmitter} from 'events';
import {NetConnectOpts, connect, Socket} from 'net';
import { RequestType } from './types.js';

/**
 * Clase que extiende de EventEmitter y que se encarga de enviar y recibir mensajes
 */
export class MessageEventEmitterClient extends EventEmitter {
  
  private connection: Socket;
  /**
   * constructor por defecto
   * @param numero_puerto número de puerto
   */
  constructor(private numero_puerto: number) {
    super();
    this.connection = connect({port: numero_puerto});
  }

  /**
   * getter de la conexión
   */
  get getConnection() {
    return this.connection;
  }

  /**
   * getter del número de puerto
   */
  get getNumeroPuerto() {
    return this.numero_puerto;
  }

  
  /**
   * Método send
   * @param args petición a enviar
   */
  send(args: RequestType ) {
    this.connection.write(JSON.stringify(args));
  }

  /**
   * Método recieve
   * @returns booleano
   */
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
