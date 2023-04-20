const CustomerFilters = (invoices, name, company) => {

    let filtered = invoices
   
    // if(name !== ''){
    //   filtered = filtered.filter(inv => inv.Name.toLowerCase().includes(name.toLowerCase()) || inv.LastName.toLowerCase().includes(name.toLowerCase()))
    // }
    if(company !== ''){
      filtered = filtered.filter(d => d.Reference.toLowerCase().includes(company.toLowerCase()))
    }
    return filtered
  }

  module.exports = CustomerFilters