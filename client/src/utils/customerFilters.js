export function filterCustomer(customers, filter) {
  return customers.filter(
    value => value?.Company?.toLowerCase().includes(filter.toLowerCase()) ||
    value?.Contact_Name?.toLowerCase().includes(filter.toLowerCase())
    )
}