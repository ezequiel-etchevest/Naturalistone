function objetosFiltrados(products) {
  return products.filter(function(product) {
    return product.InStock_Available > 0 || product.Incoming_Available > 0;
  });
}


module.exports = objetosFiltrados