export function formatNumber(numero) {
    // Eliminar cualquier caracter no numérico
    if(!numero) {
        return
    }
    let numeros = numero.replace(/\D/g, '');
  
    // Agregar el código de país si falta
    if (numeros.length == 10) {
      numeros = numeros;
    }
  
    // Formatear el número de teléfono en el formato deseado
    let codigo_area = numeros.substring(1, 4);
    let primeros_digitos = numeros.substring(4, 7);
    let ultimos_digitos = numeros.substring(7);
    return "+1 (" + codigo_area + ") " + primeros_digitos + "-" + ultimos_digitos;
  }
  