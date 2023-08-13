function parseProducts(products) {
    return Object.entries(products)
      .flat()
      .filter((element) => typeof element === "object")
      .map((product, index) => ({ variableName: `${index + 1}`, ...product }));
  }

  module.exports = parseProducts