
const historyPrice = (array) => {

    let h = {}
    let nArray = array.filter(o => h[o.SalePrice] ? false : h[o.SalePrice] = true )
    return nArray
    }

module.exports = historyPrice