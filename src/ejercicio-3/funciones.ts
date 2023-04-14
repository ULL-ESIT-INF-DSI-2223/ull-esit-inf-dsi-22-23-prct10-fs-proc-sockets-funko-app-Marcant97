import { Funko } from "./funko.js";
import {readFileSync, readdirSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import chalk from "chalk";
import { Genero, Tipo } from "./types.js";

/**
 * función que lee todos los funkos de un usuario
 * @param usuario usuario del que se quieren leer los funkos
 * @returns array de funkos del usuario
 */
export function leerFunkos(usuario: string): Funko[] {
  const nombre_usuario = usuario; 
  const filenames = readdirSync("./database/" + nombre_usuario);
  const lista_funkos: Funko[] = [];

  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido);
    lista_funkos.push(new Funko(json.nombre, json.descripcion, json.tipo, json.genero, json.franquicia, json.numero, json.exclusivo, json.caracteristicasEspeciales, json.valorMercado, json.ID));
  });
  
  return lista_funkos;
}


/**
 * Método que añade un funko nuevo a la colección de un usuario
 * @param id id del funko
 * @param usuario usuario al que deseamos añadir el funko
 * @param nombre nombre del funko
 * @param descripcion descripción del funko
 * @param tipo tipo del funko
 * @param genero género del funko
 * @param franquicia franquicia del funko
 * @param numero número del funko
 * @param exclusivo es exclusivo o no
 * @param caracteristicasEspeciales características especiales del funko
 * @param valorMercado valor de mercado del funko
 * @returns true si se ha añadido correctamente, false si no.
 */
export function addFunko(id:number, usuario:string, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: string, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valorMercado: number): string{
  // 1. comprobar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    // si no existe la carpeta del usuario, la creo
    mkdirSync("./database/" + nombre_usuario);
  }
  const filenames = readdirSync("./database/" + nombre_usuario);
  let bandera = true;
  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido);
    if (json.ID === id) {
      // el funko ya existe
      bandera = false;
      console.log(chalk.red(`Funko already exists at ${json.user} collection!`));
    }
  });
  if (bandera === true) {

    const array_tipos = Object.values(Tipo);
    let bandera_tipo = false;
    array_tipos.forEach((tipo_aux) => {
      if (tipo_aux === tipo) {
        bandera_tipo = true;
      }
    });
    if (bandera_tipo === false) {
      console.log(chalk.red(`Tipo ${tipo} does not exist`));
      return 'Tipo does not exist';
    }

    const array_generos = Object.values(Genero);
    let bandera_genero = false;
    array_generos.forEach((genero_aux) => {
      if (genero_aux === genero) {
        bandera_genero = true;
      }
    });
    if (bandera_genero === false) {
      console.log(chalk.red(`Genero ${genero} does not exist`));
      return 'Genero does not exist';
    }

    const funco_aux = new Funko(nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado, id);
    writeFileSync("./database/" + usuario + "/" + nombre + ".json", JSON.stringify(funco_aux));
    console.log(chalk.green(`Funko added to ${usuario} collection!`));
    return `Funko added to ${usuario} collection!`;
  }

  return `Funko already exists at ${usuario} collection!`;

}

/**
 * función que elimina un funko de la colección de un usuario
 * @param usuario usuario del que se quiere eliminar el funko
 * @param ID_ id del funko a eliminar
 * @returns true si se ha eliminado correctamente, false si no.
 */
export function eliminarFunko(usuario:string, ID_: number): boolean {
  // 1. comprobar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    return false;
  }
  const filenames = readdirSync("./database/" + nombre_usuario);

  // comprobar que el funko existe
  let bandera = false;
  let nombre_aux = 0;
  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido);
    if (json.ID === ID_) {
      // el funko ya existe
      bandera = true;
      nombre_aux = json.nombre;
    }
  });

  if (bandera === false) {
    console.log(chalk.red(`Funko not found at ${usuario} collection!`));
    return false;
  }
  else {
    // eliminar el fichero correspondiente al funko
    unlinkSync("./database/" + usuario + "/" + nombre_aux + ".json");
    console.log(chalk.green(`Funko removed from ${usuario} collection!`));
    return true;
  }

}

/**
 * Función que modifica un funko de la colección de un usuario
 * @param id id del funko
 * @param usuario nombre del usuario
 * @param nombre nombre del funko
 * @param descripcion descripción del funko
 * @param tipo tipo del funko
 * @param genero género del funko
 * @param franquicia franquicia del funko
 * @param numero numero del funko
 * @param exclusivo exclusivo o no
 * @param caracteristicasEspeciales características especiales del funko
 * @param valorMercado valor de mercado del funko
 * @returns true si se ha modificado correctamente, false si no.
 */
export function modificarFunko(id:number, usuario:string, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: string, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valorMercado: number): string {
  // 1. comprobar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    return `User ${usuario} does not exist`
  }
  const filenames = readdirSync("./database/" + nombre_usuario);

  // comprobar que el funko existe
  let bandera = false;
  let nombre_aux = 0;
  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido);
    if (json.ID == id) {
      // el funko ya existe
      bandera = true;
      nombre_aux = json.nombre;
    }
  });

  if (bandera === false) {
    console.log(chalk.red(`Funko not found at ${usuario} collection!`));
    return `Funko not found at ${usuario} collection!`;
  }
  else {
    const array_tipos = Object.values(Tipo);
    let bandera_tipo = false;
    array_tipos.forEach((tipo_aux) => {
      if (tipo_aux === tipo) {
        bandera_tipo = true;
      }
    });
    if (bandera_tipo === false) {
      console.log(chalk.red(`Tipo ${tipo} does not exist`));
      return `Tipo ${tipo} does not exist`
    }

    const array_generos = Object.values(Genero);
    let bandera_genero = false;
    array_generos.forEach((genero_aux) => {
      if (genero_aux === genero) {
        bandera_genero = true;
      }
    });
    if (bandera_genero === false) {
      console.log(chalk.red(`Genero ${genero} does not exist`));
      return `Genero ${genero} does not exist`;
    }
    // eliminar el fichero correspondiente al funko
    unlinkSync("./database/" + usuario + "/" + nombre_aux + ".json"); 
    // crear el nuevo funko
    const funco_aux = new Funko(nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado, id);
    writeFileSync("./database/" + usuario + "/" + nombre + ".json", JSON.stringify(funco_aux));
    console.log(chalk.green(`Funko modified at ${usuario} collection!`));
    return `Funko modified at ${usuario} collection!`;
  }

}

// /**
//  * Función que lista los funkos de un usuario
//  * @param usuario nombre del usuario
//  * @returns true si se ha listado correctamente, false si no.
//  */
// export function listaFunkos(usuario: string): boolean {
//   // leer todos los funkos de un usuario
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   if (existsSync(path) === false) {
//     console.log(chalk.red(`User ${usuario} does not exist`));
//     return false;
//   }
//   const lista_funkos = leerFunkos(usuario);
//   if (lista_funkos.length === 0) {
//     console.log(chalk.red("No funkos in the collection"));
//     return false;
//   }
//   console.log(chalk.white(`${usuario} Funko Pop collection:`));
//   lista_funkos.forEach((funko) => {
//     console.log(chalk.white("-----------------------------------"));
//     console.log(chalk.white(`ID: ${funko.getID}`));
//     console.log(chalk.white(`Nombre: ${funko.getNombre}`));
//     console.log(chalk.white(`Descripcion: ${funko.getDescripcion}`));
//     console.log(chalk.white(`Tipo: ${funko.getTipo}`));
//     console.log(chalk.white(`Genero: ${funko.getGenero}`));
//     console.log(chalk.white(`Franquicia: ${funko.getFranquicia}`));
//     console.log(chalk.white(`Numero: ${funko.getNumero}`));
//     console.log(chalk.white(`Exclusivo: ${funko.getExclusivo}`));
//     console.log(chalk.white(`Caracteristicas Especiales: ${funko.getCaracteristicasEspeciales}`));
//     if (funko.getValorMercado <= 50) {
//       console.log(chalk.green(`Valor de mercado: ${funko.getValorMercado}`));
//     }
//     else if (funko.getValorMercado > 50 && funko.getValorMercado <= 100) {
//       console.log(chalk.yellow(`Valor de mercado: ${funko.getValorMercado}`));
//     }
//     else if (funko.getValorMercado > 100 && funko.getValorMercado <= 200) {
//       console.log(chalk.red(`Valor de mercado: ${funko.getValorMercado}`));
//     }    
//     else {
//       console.log(chalk.blue(`Valor de mercado: ${funko.getValorMercado}`));
//     }
//     console.log();
//   });
//   return true;

// }

/**
 * Función que lista los funkos de un usuario
 * @param usuario nombre del usuario
 * @returns true si se ha listado correctamente, false si no.
 */
export function listaFunkos(usuario: string): Funko[] {
  // leer todos los funkos de un usuario
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    // return false;
    return [];
  }
  const lista_funkos = leerFunkos(usuario);
  if (lista_funkos.length === 0) {
    console.log(chalk.red("No funkos in the collection"));
    // return false;
    return [];
  }
  // console.log(chalk.white(`${usuario} Funko Pop collection:`));
  
  // array de funkos
  const array_funkos: Funko[] = [];

  lista_funkos.forEach((funko) => {
    // console.log(chalk.white("-----------------------------------"));
    // console.log(chalk.white(`ID: ${funko.getID}`));
    // console.log(chalk.white(`Nombre: ${funko.getNombre}`));
    // console.log(chalk.white(`Descripcion: ${funko.getDescripcion}`));
    // console.log(chalk.white(`Tipo: ${funko.getTipo}`));
    // console.log(chalk.white(`Genero: ${funko.getGenero}`));
    // console.log(chalk.white(`Franquicia: ${funko.getFranquicia}`));
    // console.log(chalk.white(`Numero: ${funko.getNumero}`));
    // console.log(chalk.white(`Exclusivo: ${funko.getExclusivo}`));
    // console.log(chalk.white(`Caracteristicas Especiales: ${funko.getCaracteristicasEspeciales}`));
    // if (funko.getValorMercado <= 50) {
    //   console.log(chalk.green(`Valor de mercado: ${funko.getValorMercado}`));
    // }
    // else if (funko.getValorMercado > 50 && funko.getValorMercado <= 100) {
    //   console.log(chalk.yellow(`Valor de mercado: ${funko.getValorMercado}`));
    // }
    // else if (funko.getValorMercado > 100 && funko.getValorMercado <= 200) {
    //   console.log(chalk.red(`Valor de mercado: ${funko.getValorMercado}`));
    // }    
    // else {
    //   console.log(chalk.blue(`Valor de mercado: ${funko.getValorMercado}`));
    // }
    // console.log();
    

    array_funkos.push(funko);   
    

  });
  return array_funkos;
}

/**
 * Función que muestra un funko
 * @param usuario nombre del usuario
 * @param id identificador del funko
 * @returns true si se ha mostrado correctamente, false si no.
 */
export function mostrarFunko(usuario: string, id: number): Funko {
  let mi_funko: Funko = new Funko("", "", "Pop!" as Tipo, "Deportes" as Genero, "", 0, false, "", 0, 0);
  // 1. comporbar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  let bandera = false;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
  }
  else {
    // 2. comprobar que el fichero existe
    const filenames = readdirSync("./database/" + nombre_usuario);
    filenames.forEach((file) => {
      const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
      const json = JSON.parse(contenido);

      if ((json.ID == id) && (bandera === false)) {
        // el funko ya existe
        // bandera = true;
        mi_funko = new Funko(json.nombre, json.descripcion, json.tipo, json.genero, json.franquicia, json.numero, json.exclusivo, json.caracteristicasEspeciales, json.valorMercado, json.ID);
        // console.log(chalk.white("-----------------------------------"));
        // console.log(chalk.white(`ID: ${mi_funko.getID}`));
        // console.log(chalk.white(`Nombre: ${mi_funko.getNombre}`));
        // console.log(chalk.white(`Descripcion: ${mi_funko.getDescripcion}`));
        // console.log(chalk.white(`Tipo: ${mi_funko.getTipo}`));
        // console.log(chalk.white(`Genero: ${mi_funko.getGenero}`));
        // console.log(chalk.white(`Franquicia: ${mi_funko.getFranquicia}`));
        // console.log(chalk.white(`Numero: ${mi_funko.getNumero}`));
        // console.log(chalk.white(`Exclusivo: ${mi_funko.getExclusivo}`));
        // console.log(chalk.white(`Caracteristicas Especiales: ${mi_funko.getCaracteristicasEspeciales}`));
        // if (mi_funko.getValorMercado <= 50) {
        //   console.log(chalk.green(`Valor de mercado: ${mi_funko.getValorMercado}`));
        // }
        // else if (mi_funko.getValorMercado > 50 && mi_funko.getValorMercado <= 100) {
        //   console.log(chalk.yellow(`Valor de mercado: ${mi_funko.getValorMercado}`));
        // }
        // else if (mi_funko.getValorMercado > 100 && mi_funko.getValorMercado <= 200) {
        //   console.log(chalk.red(`Valor de mercado: ${mi_funko.getValorMercado}`));
        // }    
        // else {
        //   console.log(chalk.blue(`Valor de mercado: ${mi_funko.getValorMercado}`));
        // }
        // console.log('dentro');
        bandera = true;
        
      }
    });
  }
  if (bandera) {
    return mi_funko;
  }
  console.log(chalk.red(`Funko with ID ${id} does not exist`))
  return mi_funko;


}