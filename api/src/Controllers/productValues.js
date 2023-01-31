function getUniqueFinishes(data) {
    let finishes = data.map(obj => obj.Finish);
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
  
    return { min: minPrice, max: maxPrice };
  }

module.exports = { getUniqueFinishes, findMaxMinPrice, getUniqueSizes, thicknessValues}
  