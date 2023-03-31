function filterInvoiceErrorsController(results, sellerID, type, number) {
  let filtered = results
    if(sellerID !== ''){
      filtered = filtered.filter(inv => inv.SellerID === Number(sellerID))
    }
    if(type !== ''){
      filtered = filtered.filter(inv => inv.Type === type)
    }
    if(number !== ''){
      filtered = filtered.filter(inv => inv.Invoice.toString().includes(number))
    }
    return filtered
  }
  
module.exports = filterInvoiceErrorsController