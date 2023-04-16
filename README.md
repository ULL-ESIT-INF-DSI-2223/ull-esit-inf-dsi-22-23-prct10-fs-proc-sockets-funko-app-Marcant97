[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/NApXvVde)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97/actions/workflows/node.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97?branch=main)



# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js

### Índice
[1. Ejercicio 1](#ejercicio-1)
[2. Ejercicio 2](#ejercicio-2)
[3. Ejercicio 3](#ejercicio-3)
[4. Ejercicios PE 103](#ejercicio-pe-103)

### Ejercicio 1
Considere el siguiente ejemplo de código fuente TypeScript que hace uso del módulo fs de Node.js:

```ts
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

En primer lugar, ejecute el programa para tratar de comprender qué hace.

A continuación, realice una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo, dos modificaciones del fichero helloworld.txt a lo largo de la ejecución. ¿Qué hace la función access? ¿Para qué sirve el objeto constants?


En la primera línea, se importan las funciones *access*, *constants* y *watch* del módulo fs de Node.js.
A continuación, nos encontramos con una estructura if-else, donde se trata de comprobar si el número de argumentos es distinto de 3. En caso de que sea así, se muestra por consola un mensaje de error. En caso contrario, se guarda el nombre del fichero en la variable filename. La función access nos permite comprobar si el fichero pasado como argumento existe, se le pasa como argumento el nombre del fichero, una constante, en este caso *constants.F_OK* , que nos permitirá comprobar que el fichero exista en el directorio actual y el último parámetro un callback *err*, encargado de manejar los posibles errores. En caso de que existiese un error, se ejecutaría la línea `console.log(`File ${filename} does not exist`);`. Si no hay error, err tomará el valor null y pasaremos a la parte del else, donde crearemos una variable de tipo *watch* con el nombre del fichero. Por último, se ejecutará el método *on* perteneciente a *EventEmitter*, que nos permite ejecutar un callback cuando se produzca un cambio en el fichero.


Primero entra en la pila de llamadas ```console.log(`Starting to watch file ${filename}`);``` y se imprime por pantalla, a continuación llega a la pila *watcher.on*, que se pasa a la web api esperando a que se produzca un cambio en el fichero. Acto seguido entra en la pila de llamadas ```console.log(`File ${filename} is no longer watched`);``` y se imprime por pantalla. Cuando se produce un cambio en el fichero, se ```console.log(`File ${filename} has been modified somehow`);``` pasa a la cola de manejadores pendiente para ejecutarse. Una vez que la pila de llamadas está vacía, se ejecuta el callback de *watcher.on* y se muestra por consola el mensaje `File ${filename} has been modified somehow`. De nuevo se ejecuta una modificación y entra en la cola de manejadores ```console.log(`File ${filename} has been modified somehow`);``` y se ejecuta cuando la pila de llamadas está vacía.

### Ejercicio 2
En la versión 1 de este ejercicio, me creo un sobproceso que se encarga de ejecutar el comando 'cat' y redirecciono la salida a otro subproceso usando pipes, que se encargará de contar el número de palabras, líneas y/o caracteres, según haya solicitado el usuario. La entrada del programa la he desarollado con yargs.
Para la versión 2, también ha sido desarrollada con yargs y para evitar el uso de pipes, para cada opción creo un sobproceso encargado de hacer el recuento solicitado, además de un evento 'data' para el proceso padre, cuando esto sucede, se le redirecciona con 'stdin.write' los datos. También existe un evento end, para terminar el proceso hijo y un evento 'data' para el hijo, cuando esto sucede se le pasa el contenido al proceso padre con 'process.stdout.write'.

### Ejercicio 3
Para este ejercicio he creado una clase `MessageEventEmitterClient`, que extiende de la clase `EventEmitter`, que nos permite crear un cliente que se conecte a un servidor mediante sockets. Tengo además un método send que se encarga de enviar los datos hacia el servidor y un método recieve que se encarga de recibir los datos enviados por el servidor, se utiliza como carácter delimitador '\n' y se ejecuta un evento 'message'. En el fichero *cliente.ts* tengo un objeto de la clase anterior, además de manejar todo lo relacionado con el paso de argumentos con *yargs* y hacer las correspondientes llamadas a send() y recieve(). También se encuentra el método *on(message)* que se encarga de procesar las respuestas provenientes del servidor.
Por otro lado se encuentra el fichero *types.js*, al que se le añadió como novedad los tipos RequesType y ResponseType utilizados para comunicarse entre cliente y servidor. También tenemos de la anterior práctica el fichero *funko.ts* y como novedad el fichero server.ts que hace la función de servidor. En él encontramos eventos como 'data', 'close' y 'request'. El evento 'data' se ejecuta cuando se recibe información del cliente y su función es procesar la petición del mismo. El evento 'close' se ejecuta cuando se cierra la conexión con el cliente y el evento 'request' se ejecuta cuando se termina de responder al cliente y el servidor se encarga de cerrar la conexión con ese cliente. En este último evento se ejecuta un switch que se encarga de procesar la petición y devolver la respuesta correspondiente. En el fichero *server.ts* se encuentra también el método *on(message)* que se encarga de procesar las respuestas provenientes del servidor. Para terminar, lo más complicado fue el fichero *funciones.ts*, ya que tenía bastante código y tuve que cambiar muchas cosas, ya que había fragmentos de funciones que no eran nada cómodas para esta nueva práctica. En este fichero encontramos funciones para añadir, borrar, modificar, mostrar y listar funkos.


### Ejercicio PE-103
En clase se solicitó crear un programa cliente-servidor haciendo uso de sockets, de la forma que se ejecute un comando unix en el cliente con sus comandos correspondiente, se envié al servidor, éste lo procese y mande de vuelta el resultado al cliente. para ello tengo un fichero *cliente.ts* y otro *server.ts*. En general conseguí realizar el ejercicio, muy similar al ejercicio- sin usar la clase *MessageEventEmitterClient*, pero no quedó perfecto, ya que al enviar la respuesta se recibía como *[object object]*, con algo más de tiempo lo hubiese arreglado.


### Dificultades
En primer lugar, el escaso desarollo de tests en el PE  esdebido a la falta de tiempo, y en el ejercicio 3 se debe a muchos problemas relacionados con la ejecución asíncrona del código.
El código no me ha quedado tan bien como me hubiese gustado debido a la carga lectiva, tampoco he desarrollado en el tercer ejercicio la escritura y lectura de ficheros asíncrona, ya que me daba muchos errores y a falta de tiempo, preferí dejarlo como estaba funcionando perfecto.