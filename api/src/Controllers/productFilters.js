
const filterProducts = (filters, allProducts) => {
  
  let filteredProds = allProducts
 
    if(filters.type !== ''){
    filteredProds = filteredProds.filter((e) => e.Type === filters.type)
    } 
   
  if(filters.size !== ''){
      filteredProds = filteredProds.filter((e) => e.Size === filters.size)
    } 
  if(filters.thickness !== ''){
      filteredProds = filteredProds.filter((e) => e.Thickness === filters.thickness)
    }
  if(filters.price?.length){
      filteredProds = filteredProds.filter((e) => e.Price >= filters.price[0] && e.Price <= filters.price[1])
  }
  return filteredProds
}

module.exports = filterProducts