const invoicesPayments = require('./invoicesPayments')


let paymentStats = (invoices) => {

  let invoicesP= invoicesPayments(invoices)

	let getClosingQuotes = () => {
    const invoicesQuantity = invoices.length
    const filteredArray = invoices.filter(obj => obj.Payments !== null);
    const invoicesPaid = filteredArray.reduce((acc) => acc + 1, 0);
    const closingRate = `${((invoicesPaid / invoicesQuantity) * 100).toFixed(1)}%`;
    if(!closingRate || invoicesQuantity === 0 && invoicesPaid === 0) {
      return 0
    }
    return closingRate
    }  

	let getTotalCharged = () => {
		let acc = 0 
    for(i=0;i<invoicesP.length;i++){
      if(invoicesP[i].Percentaje){
        acc += (invoicesP[i].Value * Number(invoicesP[i].Percentaje)) / 100
      }
    }
    if (!acc || acc === 0) {
      return 0
    }
    return acc.toFixed(2)
	  }

  let getTotalQuotesAmount = () => {
      let accQuotes = invoicesP.reduce(function(total, current){
        return total + Number(current.Value)
      }, 0)  
      return accQuotes
    }
    
	let getClosingDaysAvg = () => {

    let dias = []
    let amount = 0
    function calcularDiferenciaDias(invoice, array) {
      // Obtener la fecha de creación del invoice y convertirla a objeto Date
      const fechaCreacion = new Date(invoice.InvoiceDate);
      // Obtener la fecha del primer pago y convertirla a objeto Date
      const fechaPrimerPago = new Date(invoice.Payments[0][2]);
      // Calcular la diferencia en milisegundos entre ambas fechas
      const diferenciaMs = fechaPrimerPago.getTime() - fechaCreacion.getTime();
      // Convertir la diferencia a días y redondear hacia abajo
      const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
      amount += diferenciaDias
      return array.push(diferenciaDias);
    }
    
    let getPaidInvoicesValues = () =>{
      for(i=0; i<invoicesP.length; i++){
        if(invoicesP[i].Percentaje != null) {
          calcularDiferenciaDias(invoicesP[i], dias)
        }
      }
      let val = amount / dias.length
      return val
    }
    

    let values = getPaidInvoicesValues()
    if(amount === 0) return 0
    else return values.toFixed(2)
	  }

	let totalCharged = getTotalCharged()
	let closingDaysAvg = getClosingDaysAvg()

  let getClosingRate = () => {
    let totalQuotesAmount = getTotalQuotesAmount()
    if(!totalQuotesAmount || totalQuotesAmount === 0) {
      return 0
    }
    let closingRate = (totalCharged * 100) / totalQuotesAmount
    return `${closingRate.toFixed(2)} %`
    }
  
  let getPaidQuotes = () => {
    const filteredArray = invoices.filter(obj => obj.Payments !== null);
    let val = filteredArray.length
    return val
  }

  let closingRate = getClosingRate()
  let closingQuotes = getClosingQuotes()
  let paidQuotes = getPaidQuotes()

return { closingRate, totalCharged, closingDaysAvg, closingQuotes, paidQuotes }
}





module.exports = paymentStats