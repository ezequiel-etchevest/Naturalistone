const prodValues = (arr, search, price) => {


function getUniqueFinishes(arr) {
    let finishes = arr.map(obj => obj.Finish);
    return [...new Set(finishes)].filter(f => f !== null);
  }

function getUniqueSizes(arr) {
    const sizes = arr.map(item => item.Size);
    return Array.from(new Set(sizes));
  }
const thicknessValues = (arr) => {
    const thicknesses = arr.map(item => item.Thickness);
    return [...new Set(thicknesses)];
  };
const materialsValues = (arr) => {
    const materials = arr.map(item => item.Material);
    return [...new Set(materials)];
  };


  let finishValues = getUniqueFinishes(arr)
  let priceMaxmin = price
  let sizes = getUniqueSizes(arr)
  let thickness = thicknessValues(arr)
  let materials = materialsValues(arr)


  return {finishValues, priceMaxmin, sizes, thickness, materials, search}
}
function findMaxMinPrice(arr) {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  arr.forEach(obj => {
    if (obj.Price < minPrice) {
      minPrice = obj.Price;
    }
    if (obj.Price > maxPrice) {
      maxPrice = obj.Price;
    }
  });
  if (minPrice === null ) minPrice = 0
  return { min: minPrice, max: maxPrice };
}
module.exports = {prodValues, findMaxMinPrice}
  