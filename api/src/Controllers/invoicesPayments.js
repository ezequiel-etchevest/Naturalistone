


const invoicesPayments = (array) => {

    array.forEach(invoices => {
        if( invoices.Payments){
            invoices.Payments = invoices.Payments.split(',')
            invoices.Payments = invoices.Payments.map(e => {
                e = e.split(';')
                e[2] = e[2].split(' ')[0]
                return e
            })
        } });

    return array
}

module.exports = invoicesPayments




