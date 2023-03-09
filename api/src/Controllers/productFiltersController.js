
const filterProducts = (finish, size, thickness, material, search, price1, price2, allProducts) => {

  let filteredProds = allProducts
  let errorsSearch = {}
    // if(type !== ''){
    //   filteredProds = filteredProds.filter((e) => e.Type === type)
    // } 
    if(finish !== ''){
      let filteredFinish = filteredProds.filter((e) => e.Finish === finish)
      if(!filteredFinish.length) errorsSearch.error = `No match for Finish: ${finish}`
       else filteredProds = filteredFinish
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
    if(material !== ''){
      let filteredMat= filteredProds.filter((e) => e.Material === material)
      if(!filteredMat.length) errorsSearch.error = `No match for Material: ${material}`
      else filteredProds = filteredMat
    }
    if(search !== ''){
      let filteredSearch= filteredProds.filter(e => e.ProductName?.toLowerCase().includes(search))
      if(!filteredSearch.length) errorsSearch.error = `No match for Search: ${search}`
      else filteredProds = filteredSearch
    }

    if(!!price1 && !!price2 ){
      let filteredPrice = filteredProds.filter((e) => e.Price >= price1 && e.Price <= price2)
      if(!filteredPrice.length) errorsSearch.error = `No match for Price range: ${price1} - ${price2}`
      else filteredProds = filteredPrice
    }
  return {filteredProds, errorsSearch}
}

module.exports = filterProducts
