const CustomerFilters = (invoices, name) => {

  let filtered = invoices;

  if (name !== '') {
    filtered = filtered.filter((inv) => {
        return (
          inv.Contact_Name && inv.Contact_Name.toLowerCase().includes(name.toLowerCase()) ||
          inv.Company && inv.Company.toLowerCase().includes(name.toLowerCase())
        );
    });
  }

  return filtered;
};

module.exports = CustomerFilters 
