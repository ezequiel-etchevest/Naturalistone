function updateProducts(existingProducts, newProducts) {

  const queryProducts = {
    updateStatus: [],
    insert: [],
    updateQuantity: [],
    updateStatusQuantity: [],
    cancelStatus: []
  };

  existingProducts.forEach((existingProduct) => {
    const { ProdID } = existingProduct;
    const product = newProducts.find((newProduct) => newProduct.prodID === ProdID);

    if (!product) {
      console.log('este producto tiene que ser cancelado');
      queryProducts.cancelStatus.push(existingProduct);
    }
  });

  newProducts.forEach((newProduct) => {
    const { prodID, quantity } = newProduct;

    const existingProduct = existingProducts.find((existingProd) => existingProd.ProdID === prodID);

    if (existingProduct) {
      if (existingProduct.Status !== 'Canceled') {
        if (existingProduct.Quantity !== quantity) {
          console.log('actualizado en su field, quantity');
          queryProducts.updateQuantity.push(newProduct);
        }
      } else {
        if (existingProduct.Quantity !== quantity) {
          console.log('actualizado en su field, quantity y en su field Status');
          queryProducts.updateStatusQuantity.push(newProduct);
        } else {
          console.log('actualizado en su field Status');
          queryProducts.updateStatus.push(newProduct);
        }
      }
    } else {
      console.log('este producto tiene que ser insertado');
      queryProducts.insert.push(newProduct);
    }
  });
  return queryProducts;
}


function buildUpdateValuesQuery(
  SellerID,
  idProjects,
  LastInsertDate,
  estDelivDate,
  shipVia,
  ModificationFlag,
  paymentTerms,
  method,
  transferFee,
  cratingFee,
  shippingFee
  ) {
  let updateValues = [];

  if (idProjects) updateValues.push(`ProjectID = ${idProjects}`)
  if (LastInsertDate) updateValues.push(`LastInsertDate = '${LastInsertDate}'`)
  if (estDelivDate) updateValues.push(`EstDelivery_Date = '${estDelivDate}'`)
  if (shipVia) updateValues.push(`ShippingMethod = '${shipVia}'`)
  if (SellerID) updateValues.push(`SellerID = '${SellerID}'`)
  if (ModificationFlag) updateValues.push(`ModificationFlag = '${ModificationFlag}'`)
  if (paymentTerms) updateValues.push(`PaymentTerms = '${paymentTerms}'`)
  if (method) updateValues.push(`P_O_No = '${method}'`)
  if (transferFee) updateValues.push(`Transfer_Fee = '${transferFee}'`)
  if (cratingFee) updateValues.push(`Crating_Fee = '${cratingFee}'`)
  if (shippingFee) updateValues.push(`Shipping_Fee = '${shippingFee}'`)


  return updateValues.join(', ');
}

  module.exports = { updateProducts, buildUpdateValuesQuery };
  