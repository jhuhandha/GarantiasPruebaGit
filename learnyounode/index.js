// var let const
// let nombre = 'Juan';

// function hola() {
//   let nombre = 'David';
//   return nombre;
// }

// console.log(hola());
// console.log(nombre);

// 'use strict';

// function hola() {
//   const nombre = 'Juan';
// }
// hola();
// let nombre = 'David';

// arrow functions
// console.log(nombre);

// function hola(a, b) {
//   return a + b;
// }

// let suma = (a, b) => a + b;

// console.log(hola(5, 8));
// console.log(suma(5, 8));

// console.log(hola());
// function hola() {
//   return 'Hola';
// }

// let chao = () => 'Chao';
// console.log(chao());

// CallBacks
// let suma = (a, b, callback) => {
//   setTimeout(() => {
//     callback(a + b);
//   }, 1000);
// };

// let resultado = suma(5, 6, (resultado) => {
//   console.log(resultado);
// });

let suma = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a > b) {
        resolve(a + b);
      } else if (a == b) {
        resolve(a + b);
      } else {
        reject('Operacion no valida');
      }
    }, 5000);
  });
};

let resta = (a) => a - 5;

let call = async () => {
  try {
    let resultado = await suma(9, 8);
    let _suma = await (5 + 5);
    console.log(resta(resultado));
    console.log(resultado);
  } catch (e) {
    console.log(e);
  }
};

call();

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
