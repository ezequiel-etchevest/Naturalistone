
export function formatProducts(array) {

  const propertyMapping = {
      Quantity:'quantity',
      ProdID: 'prodID',
      ProductName:"prodName",
      Material:"type",
      Size: 'size',
      Thickness:"thickness",
      Finish:"finish",
      SalePrice:"price",
      authFlag:"authFlag"
    } ;

    const invoiceProductsMap = array.reduce((result, product) => {
      const productData = {};
    
      for (const property in propertyMapping) {
        if (property in product) {
          const mappedProperty = propertyMapping[property];
          productData[mappedProperty] = product[property];
        }
      }
    
      result[productData.prodID] = productData;
      return result;
    }, {});
    return invoiceProductsMap
}
