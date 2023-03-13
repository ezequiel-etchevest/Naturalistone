const invoicesFilters = (invoices, name, number, seller) => {
  let filtered = invoices
 
  if(name !== ''){
    filtered = filtered.filter(inv => inv.Reference.toLowerCase().includes(name.toLowerCase()))
  }
  if(number !== ''){
    filtered = filtered.filter(d => d.Naturali_Invoice.toString().includes(number))
  }
  if(seller !== ''){
    filtered = filtered.filter(s => s.SellerID === Number(seller))
  }
  return filtered
}

module.exports = invoicesFilters