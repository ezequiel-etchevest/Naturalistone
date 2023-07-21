function productsNotEqual(array){

const propiedadesUnicas = new Set();
const resultado = array.filter((objeto) => {
const propiedades = `${objeto.Finish}-${objeto.Material}-${objeto.ProductName}`;
if (propiedadesUnicas.has(propiedades)) {
  return false; // Elemento duplicado, no lo incluimos en el resultado
}
propiedadesUnicas.add(propiedades);
return true; // Elemento único, lo incluimos en el resultado
});

  return resultado
}

module.exports = { productsNotEqual }