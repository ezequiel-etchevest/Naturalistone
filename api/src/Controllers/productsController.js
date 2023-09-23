const mysqlConnection = require("../db");

const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getProductIDByName = (prodName) => {
  return new Promise((resolve, reject) => {
    try {
      const getProductNameQuery = `SELECT * FROM ProdNames WHERE Naturali_ProdName = "${prodName}" `;
      mysqlConnection.query(getProductNameQuery, (err, resultProductName) => {
        if (err) {
          reject('Error in get product name');
        }
        if (resultProductName.length) {
          reject("Product name already exists");
        }
      resolve(resultProductName);
      return resultProductName
      });
    } catch (error) {
      console.log('Product name already exists')
      throw error
  }
  });
};

const createProductName = async (prodName, factoryProdName, material, numberFactory) => {
  try {

  const postProductNameQuery = `INSERT INTO ProdNames (Naturali_ProdName, Factory_ProdName, FactoryID, Material)
                                VALUES ("${prodName}", "${factoryProdName}", ${numberFactory}, "${material}")`;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(postProductNameQuery, (err, postProductNameResult) => {
      if (err) {
        reject('Error in create product');
        console.log('Error in create product')
      }
      console.log("Product name created successfully", postProductNameResult);
      resolve(postProductNameResult.insertId);
      return postProductNameResult.insertId
    });
  });
  } catch (error) {
    console.log('Error in create product')
    throw `Error in create product ${error}`
}
};

const getOrCreateDimension = async (dimension) => {
  try {
  const getDimensionProductQuery = `SELECT * FROM Dimension WHERE Type = "${dimension.type}" AND Size = "${dimension.size}" AND Thickness = "${dimension.thickness}" AND Finish = "${dimension.finish}"`;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(getDimensionProductQuery, async (err, getDimensionResult) => {
      if (err) {
        reject('Error in get dimension');
      }

      if (getDimensionResult.length === 0) {
        const postDimension = `INSERT INTO Dimension (Type, Size, Thickness, Finish)
                               Values ("${dimension.type}", "${dimension.size}", "${dimension.thickness}", "${dimension.finish}")`;

        mysqlConnection.query(postDimension, (err, postDimensionResult) => {
          if (err) {
            console.log('Error in create dimension')
            reject('Error in create dimension');
          }
          console.log("Dimension created successfully", postDimensionResult);
          resolve(postDimensionResult.insertId);
          return postDimensionResult.insertId
        });
      } else {
        resolve(getDimensionResult[0].DimensionID);
        return getDimensionResult[0].DimensionID
      }
    });
  });
  } catch (error) {
    console.log('Error in get dimension')
    throw `Error in get dimension ${error}`
  }
};

const createProductEntry = async (idProductName, dimensionID, price, formattedDate) => {
  try {
  const getProductQuery = `SELECT * FROM Products WHERE ProdNameID = "${idProductName}" AND DimensionID = "${dimensionID}"`

  return new Promise((resolve, reject) => {
  mysqlConnection.query(getProductQuery, function(err, getProductResult) {
    if (err) {
      reject('Error in get product name')
    }
    if (getProductResult.length) {
      console.log("Product already exists")
      reject("Product already exists")
    }

  const postProductQuery = `INSERT INTO Products (ProdNameID, DimensionID, SalePrice, Updated_Date)
                            VALUES (${idProductName}, ${dimensionID}, ${price}, "${formattedDate}")`;

    mysqlConnection.query(postProductQuery, (err, postProductResult) => {
      if (err) {
        reject('Error in create product');
      }
      console.log("Product created successfully", postProductResult);
      resolve(postProductResult.insertId);
      return postProductResult.insertId
    });
  });
})

  } catch (error) {
    console.log('General error in create product')
    throw `Error in create product ${error}`
  }
};

module.exports = {
    createProductEntry,
    createProductName,
    getFormattedDate,
    getOrCreateDimension,
    getProductIDByName
}