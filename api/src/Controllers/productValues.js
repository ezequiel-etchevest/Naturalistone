const prodValues = (arr, search, price, sqftMin, sqftMax, sqftMinMax) => {

function getUniqueFinishes(arr) {
    let finishes = arr.map(obj => obj.Finish === null ? obj.Finish = 'N/A' : obj.Finish);
    // return [...new Set(finishes)].filter(f => f !== null);
    return [...new Set(finishes)];
  }

function getUniqueSizes(arr) {
    const sizes = arr.map(item => item.Size);
    return Array.from(new Set(sizes));
  }
const thicknessValues = (arr) => {
    const thicknesses = arr.map(item => item.Thickness === null ? item.Thickness = 'N/A' : item.Thickness);
    return [...new Set(thicknesses)];
  };
const materialsValues = (arr) => {
    const materials = arr.map(item => item.Material);
    return [...new Set(materials)];
  };
const sqftValues = (arr) => {
  const sqftFilter = arr.filter(item => item.sqft > sqftMin && item.sqft < sqftMax)
  return [...new Set(sqftFilter)];
}

  let finishValues = getUniqueFinishes(arr)
  let priceMaxmin = price
  let minMaxsqft = sqftMinMax
  let sizes = getUniqueSizes(arr)
  let thickness = thicknessValues(arr)
  let materials = materialsValues(arr)
  let sqftFilters = sqftValues(arr)


  return {finishValues, priceMaxmin, sizes, thickness, materials, search, sqftFilters, minMaxsqft}
}

function findMaxMinPrice(arr) {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  if(arr.length > 0 ){
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
  }else{
    return { min: 0, max: 9999};
  }
}

function getSqftMaxMin(products) {
  const sqft = products.sort((a, b) => a.sqft - b.sqft)
  return {
    min: sqft[0].sqft,
    max: sqft[sqft.length -1].sqft
  }
}
module.exports = {prodValues, findMaxMinPrice, getSqftMaxMin}
  