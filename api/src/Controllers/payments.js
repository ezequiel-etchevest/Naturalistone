function payments(results1, results2){
    let amount = results2[0].Value
    let sumPayments = results1.reduce((acc, act)=> acc + act.Amount)
    let per =(sumPayments * 100) / amount
    
}