[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/NApXvVde)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97/actions/workflows/node.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-Marcant97?branch=main)



# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js



### Índice
[1. Ejercicio 1](#ejercicio-1)
[]()
[]()
[]()


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

### Ejercicio 3

### Ejercicio PE-103