


const invoicesPayments = (array) => {

    array.forEach(invoices => {
        if( invoices.Payments && invoices.Payments !== undefined){
            invoices.Payments = invoices.Payments.split(',')
            invoices.Payments = invoices.Payments.map(e => {
                e = e.split(';')
                e[2] = e[2].split(' ')[0]
                return e
            })
        } });
        
    array.forEach(invoice => {
      let acc = 0

      if(invoice.Payments !== null) {
        invoice.Percentaje = invoice.Payments.forEach(payment => {
        return acc = acc + parseFloat(payment[1])
      })
      let perc =( acc * 100) / invoice.Value
      invoice.Percentaje = perc.toFixed(2)
    }})
    return array
}

module.exports = invoicesPayments



// .reduce((acc, curr) => acc + curr, initialValue)
