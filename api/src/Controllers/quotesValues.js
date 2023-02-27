function uniqueFormatNames(array) {
  const uniqueNames = {};

  array.forEach(obj => {
    const fullName = `${obj.FirstName} ${obj.LastName}`;
    if (!uniqueNames[fullName]) {
      uniqueNames[fullName] = { sellerID: obj.SellerID };
    }
  });

  return Object.entries(uniqueNames).map(([name, data]) => ({ name, sellerID: data.sellerID }));
}


module.exports= uniqueFormatNames