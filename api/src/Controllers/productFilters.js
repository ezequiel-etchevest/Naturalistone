
const filterProducts = (type, size, thickness, price1, price2, allProducts) => {

  let filteredProds = allProducts
 
    if(type !== ''){
      filteredProds = filteredProds.filter((e) => e.Type === type)
    } 
    if(size !== ''){
      filteredProds = filteredProds.filter((e) => e.Size === size)
    } 
    if(thickness !== ''){
      filteredProds = filteredProds.filter((e) => e.Thickness === thickness)
    }
    if(!!price1 && !!price2 ){
      filteredProds = filteredProds.filter((e) => e.Price >= price1 && e.Price <= price2)
    }
 
  return filteredProds
}

module.exports = filterProducts



// const filterProducts = (type, size, thickness, price1, price2, allProducts) => {

//   let filteredProds = allProducts
//   let errorsSearch = {type: '', size: '', thickness:''}

//     if(type !== ''){
//       if(e.Type !== type) errorsSearch.type = `No products match search Type: ${type}` 
//       else return filteredProds = filteredProds.filter((e) => e.Type === type)
//     }  
//     if(size !== ''){
//       if(e.Size !== size) errorsSearch.size = `No products match search Size: ${size}`
//       else return filteredProds = filteredProds.filter((e) => e.Size === size)
//       } 
//     if(thickness !== ''){
//       if(e.Thickness === thickness) errorsSearch.thickness = `No products match search Thickness: ${thickness}`
//       else return filteredProds = filteredProds.filter((e) => e.Thickness === thickness)
//     }
//     if(!!price1 && !!price2 ){
//         filteredProds = filteredProds.filter((e) => e.Price >= price1 && e.Price <= price2)
//     }
//     console.log(errorsSearch)
//   return filteredProds
// }