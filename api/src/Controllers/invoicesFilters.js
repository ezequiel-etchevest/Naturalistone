const invoicesFilters = (invoices, name, number, seller, quoteStatus) => {
  let filtered = invoices
 
  if (name !== '') {
    filtered = filtered.filter(inv => (
      (inv.Company !== null && inv.Company.toLowerCase().includes(name.toLowerCase())) ||
      (inv.Contact_Name !== null && inv.Contact_Name.toLowerCase().includes(name.toLowerCase()))
    ));
  }
  
  if(number !== ''){
    filtered = filtered.filter(d => d.Naturali_Invoice.toString().includes(number))
  }
  if(seller !== ''){
    filtered = filtered.filter(s => s.SellerID === Number(seller))
  }
  if(quoteStatus !== ''){
    filtered = filtered.filter(invoice => invoice.Status === quoteStatus)
  }

  return filtered
}

module.exports = invoicesFilters