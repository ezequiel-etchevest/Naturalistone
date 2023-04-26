const CustomerFilters = (invoices, name) => {

  let filtered = invoices;

  if (name !== '') {
    filtered = filtered.filter((inv) => {
        return (
          inv.Name && inv.Name.toLowerCase().includes(name.toLowerCase()) ||
          inv.LastName && inv.LastName.toLowerCase().includes(name.toLowerCase()) || 
          inv.Reference && inv.Reference.toLowerCase().includes(name.toLowerCase())
        );
    });
  }

  return filtered;
};


module.exports = CustomerFilters