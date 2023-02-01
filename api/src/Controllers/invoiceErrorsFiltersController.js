
const filterInvoiceErrorsController = (id, type, allInvoicesErrors) => {

    let filteredInvoicesErrors = allInvoicesErrors
    let errorsSearch = {}

      if(id !== ''){
        let filteredID = filteredInvoicesErrors.filter((e) => e.SellerID === parseInt(id))
        if(!filteredID.length) errorsSearch.error = `No match for ID: ${id}`
         else filteredInvoicesErrors = filteredID
      }  
      if(type !== ''){
        let filteredType = filteredInvoicesErrors.filter((e) => e.Type === type)
        if(!filteredType.length) errorsSearch.error = `No match for Type: ${type}`
        else filteredInvoicesErrors = filteredType
      } 
    return {filteredInvoicesErrors, errorsSearch}
  }
  
  module.exports = filterInvoiceErrorsController
  