const invoicesPayments = require('./invoicesPayments')


let paymentStats = (invoices) => {

  let invoicesP= invoicesPayments(invoices)
	let getClosingRate = () => {
    const invoicesQuantity = invoices.length
    const filteredArray = invoices.filter(obj => obj.Payments !== null);
    const invoicesPaid = filteredArray.reduce((acc) => acc + 1, 0);
    const closingRate = `${((invoicesPaid / invoicesQuantity) * 100).toFixed(2)} %`;
    return closingRate
  }
	let getTotalCharged = () => {
		let acc = 0 
    for(i=0;i<invoicesP.length;i++){
      if(invoicesP[i].Percentaje){
        acc += (invoicesP[i].Value * Number(invoicesP[i].Percentaje)) / 100
      }
    }
    return acc.toFixed(2)
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
	let closingRate = getClosingRate()
	let totalCharged = getTotalCharged()
	let closingDaysAvg = getClosingDaysAvg()

return { closingRate, totalCharged, closingDaysAvg }
}





module.exports = paymentStats