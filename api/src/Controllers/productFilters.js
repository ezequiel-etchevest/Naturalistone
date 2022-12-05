
const filterProducts = (type, size, thickness, price1, price2, allProducts) => {

  let filteredProds = allProducts
  let errorsSearch = {}
    // if(type !== ''){
    //   filteredProds = filteredProds.filter((e) => e.Type === type)
    // } 
    if(type !== ''){
      let filteredType = filteredProds.filter((e) => e.Type === type)
      if(!filteredType.length) errorsSearch.error = `No match for Type: ${type}`
       else filteredProds = filteredType
        
      
  }  
    if(size !== ''){
      let filteredSize = filteredProds.filter((e) => e.Size === size)
      if(!filteredSize.length) errorsSearch.error = `No match for Size: ${size}`
      else filteredProds = filteredSize
    } 
    if(thickness !== ''){
      let filteredThik = filteredProds.filter((e) => e.Thickness === thickness)
      if(!filteredThik.length) errorsSearch.error = `No match for Thickness: ${thickness}`
      else filteredProds = filteredThik
    }
    if(!!price1 && !!price2 ){
      let filteredPrice = filteredProds.filter((e) => e.Price >= price1 && e.Price <= price2)
      if(!filteredPrice.length) errorsSearch.error = `No match for Price range: ${price1} - ${price2}`
      else filteredProds = filteredPrice
    }
  return {filteredProds, errorsSearch}
}

module.exports = filterProducts



// const filterProducts = (type, size, thickness, price1, price2, allProducts) => {

//   let filteredProds = allProducts
//   let errorsSearch = {type: '', size: '', thickness:''}

    // if(type !== ''){
    //     filteredType = filteredProds.filter((e) => e.Type === type)
    //     if(!filteredType.length) errorsSearch.type = `No products match search Type: ${type}`
    //      else filteredProds = filteredType
    // }  
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