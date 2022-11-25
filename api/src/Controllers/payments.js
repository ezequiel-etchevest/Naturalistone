function payments(payments, invoiceData){
    let amount = invoiceData[0].Value
    let sumPayments = 0
    for(i=0; i<payments.length; i++){
        sumPayments += payments[i].Amount
        }
    let per =(sumPayments * 100) / amount
    let rest = amount - sumPayments
    return {
        PaymentPercentaje: per.toFixed(2),
        PendingAmount: rest.toFixed(2)
    }
}
module.exports = payments