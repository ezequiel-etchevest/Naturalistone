function uniqueFormatNames(array) {
    const names = array.map(obj => `${obj.FirstName} ${obj.LastName}`);
    return [...new Set(names)];
  }

module.exports= uniqueFormatNames