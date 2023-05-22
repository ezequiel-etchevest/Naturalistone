function payments(payments, invoiceData) {
    let amount = invoiceData[0].Value;
    let sumPayments = 0;
    let cardPaymentAmount = 0;
  
    for (let i = 0; i < payments.length; i++) {
      sumPayments += payments[i].Amount;
      if (payments[i].Method === 'Card') {
        cardPaymentAmount += payments[i].Amount;
      }
    }
  
    let per = (sumPayments * 100) / amount;
    let rest = amount - sumPayments;
  
    return {
      PaymentPercentage: per.toFixed(2),
      PendingAmount: rest.toFixed(2),
      CardPaymentAmount: cardPaymentAmount.toFixed(2)
    };
  }
  
  module.exports = payments;
  