
const filterInvoiceErrors = (sellerID, Type, allInvoicesErrors) => {

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
  