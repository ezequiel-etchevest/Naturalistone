const express = require("express");
const productsRouter = express.Router();
const mysqlConnection = require("../db");
const filterProducts = require("../Controllers/productFiltersController");
const {
  prodValues,
  findMaxMinPrice,
  getSqftMaxMin,
} = require("../Controllers/productValues");
const objetosFiltrados = require("../Controllers/inventoryController");
const { getImage } = require("../Controllers/oneDriveProductImages");
const { productsNotEqual } = require("../Controllers/productsNotRepeat");

productsRouter.get("/", async function (req, res) {

  query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    ProdNames.Material,
                    Dimension.Type,
                    Dimension.Size,
                    Dimension.Thickness,
                    Dimension.Finish,
                    Products.SalePrice AS Price,
                    Products.ProdID,
                    Products.Discontinued_Flag,
                    Inventory.*
                  FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID`;
  try {
    mysqlConnection.query(query_, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        console.log("Error en productRoutes.get /");
        res.status(200).json({});
      } else {
        let instock = objetosFiltrados(results);
        res.status(200).json(instock);
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

productsRouter.get("/new_quote", async function (req, res) {
  let { finish, material, search } = req.query;

  const query = `
  SELECT    
    ProdNames.Naturali_ProdName AS ProductName,
    ProdNames.Material,
    Dimension.Type,
    Dimension.Size,
    Dimension.Finish,
    Dimension.Thickness,
    Dimension.SQFT_per_Slab,
    Products.SalePrice AS Price,
    Products.ProdID,
    Inventory.*,
    CASE
      WHEN Dimension.Type = "Tile" OR Dimension.Type = "Mosaic"
        THEN Inventory.InStock_Available + Inventory.Incoming_Available
      WHEN Dimension.Type = "Slab"
        THEN Inventory.InStock_Available + Inventory.Incoming_Available * Dimension.SQFT_per_Slab
      ELSE NULL
    END AS Available_Stock
  FROM Products
  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID 
  ${material.length ? `AND (ProdNames.Material = "${material}")` : ``}
  ${finish.length ? `AND (Dimension.Finish = "${finish}")` : ``}
  ${
    search.length
      ? `AND (LOWER(ProdNames.Naturali_ProdName) LIKE LOWER('%${search}%'))`
      : ``
  }
  WHERE ProdNames.Naturali_ProdName IS NOT NULL AND Dimension.Finish IS NOT NULL AND Dimension.Size IS NOT NULL AND Dimension.Thickness IS NOT NULL 
  ORDER BY Available_Stock DESC
  `;

  try {
    mysqlConnection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        let price = findMaxMinPrice(results);
        let filteredValues = prodValues(results, search, price);
        console.log("Error en productsRoutes.get /filtered");
        res
          .status(200)
          .json({ results, errorSearch: "No products found", filteredValues });
      } else {
        let price = findMaxMinPrice(results);
        let filteredValues = prodValues(results, search, price);
        let errorSearch = {};

        res.status(200).json({ results, errorSearch, filteredValues });
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

productsRouter.get("/new_samples", async function (req, res) {
  let { finish, material, search } = req.query;

  const query = `
  SELECT
    ProdNames.Naturali_ProdName AS ProductName,
    ProdNames.Material,
    ProdNames.ProdNameID,
    Dimension.Finish,
    Products.ProdID
  FROM Products
  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID
  WHERE ProdNames.Naturali_ProdName IS NOT NULL AND Dimension.Finish IS NOT NULL
  ${material.length ? `AND (ProdNames.Material = "${material}")` : ``}
  ${finish.length ? `AND (Dimension.Finish = "${finish}")` : ``}
  ${
    search.length
      ? `AND (LOWER(ProdNames.Naturali_ProdName) LIKE LOWER('%${search}%'))`
      : ``
  }
  ORDER BY ProdNames.Naturali_ProdName ASC
  `;

  try {
    mysqlConnection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        let filteredValues = prodValues(results, search);
        console.log("Error en productsRoutes.get /new_samples");
        res
          .status(200)
          .json({ results, errorSearch: "No products found", filteredValues });
      } else {
        results = productsNotEqual(results);
        let filteredValues = prodValues(results, search);
        let errorSearch = {};
        res.status(200).json({ results, errorSearch, filteredValues });
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

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

productsRouter.post("/", async (req, res) => {
  const { prodName, factoryProdName, material, factory, dimensions, idProductName } = req.body.product;
  const numberFactory = Number(factory);
  const formattedDate = getFormattedDate();

  try {
    mysqlConnection.beginTransaction();

    let prodNameID;

    if (prodName) {
      await getProductIDByName(prodName);
      prodNameID = await createProductName(prodName, factoryProdName, material, numberFactory);
    }

      for (const dimension of dimensions) {
        const dimensionID = await getOrCreateDimension(dimension);
        await createProductEntry(idProductName || prodNameID, dimensionID, dimension.price, formattedDate);
      }

    await mysqlConnection.commit();
    res.status(200).json({ success: true, msg: "Create product successful" });
  } catch (error) {
    console.log("General Error:", error);
    await mysqlConnection.rollback();
    res.status(500).json({ success: false, msg: error });
  }
});


// productsRouter.post("/", async function (req, res) {
//   const { prodName, factoryProdName, material, factory, dimensions, idProductName } =
//     req.body.product;

//   console.log("reqbody", req.body.product)

//   const numberFactory = Number(factory);

//   const date = new Date();

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   const formattedDate = `${year}-${month}-${day}`;

//   try {
//     mysqlConnection.beginTransaction(async function (err) {
//       if (err) {
//         mysqlConnection.rollback(() => {
//           console.error("Error in start transaction");
//         });
//         return res
//           .status(500)
//           .json({ success: false, msg: "Error in start transaction" });
//       }

//       let prodNameID;

//       if (prodName) {
//         console.log("aqui entro post create product")
//       const getProductNameQuery = `SELECT * FROM ProdNames WHERE Naturali_ProdName = "${prodName}" `;

//       mysqlConnection.query(
//         getProductNameQuery,
//         function (err, resultProductName) {
//           if (err) {
//             mysqlConnection.rollback(() => {
//               console.error("Error in get product name");
//             });
//             return res
//               .status(400)
//               .json({ success: false, msg: "Error in get product name" });
//           }
//           if (resultProductName.length) {
//             mysqlConnection.rollback(() => {
//               console.error("Product name already exists");
//             });
//             return res.status(400).json({
//               success: false,
//               msg: "Product name already exists",
//             });
//           }
//         });

//           const postProductNameQuery = `INSERT INTO ProdNames (Naturali_ProdName, Factory_ProdName, FactoryID, Material)
//                                     VALUES ("${prodName}", "${factoryProdName}", ${numberFactory}, "${material}")`;

//           mysqlConnection.query(
//             postProductNameQuery,
//             async function (err, postProductNameResult) {
//               if (err) {
//                 mysqlConnection.rollback(() => {
//                   console.error("Error in create product name");
//                 });
//                 return res.status(400).json({
//                   success: false,
//                   msg: "Error in create product",
//                 });
//               }
//               console.log(
//                 "product name create successful",
//                 postProductNameResult
//               );

//               prodNameID = postProductNameResult.insertId;
//             });
//           }
//         console.log("aqui entro post dimension create")

//             console.log("prodst", prodNameID)

//               const postProducts = dimensions.map((dimension) => {
//                 const getDimensionProductQuery = `SELECT * FROM Dimension
//           WHERE Type = "${dimension.type}" AND Size = "${dimension.size}" AND Thickness = "${dimension.thickness}" AND Finish = "${dimension.finish}"`;

//                 return new Promise((resolve, reject) => {
//                   mysqlConnection.query(
//                     getDimensionProductQuery,
//                     function (err, getDimensionResult) {
//                       if (err) {
//                         reject(err);
//                         mysqlConnection.rollback(() => {
//                           console.error("Error in get dimensions");
//                         });
//                         return res.status(400).json({
//                           success: false,
//                           msg: "Error in get dimensions",
//                         });
//                       }
//                       resolve(getDimensionResult);

//                       if (getDimensionResult.length === 0) {
//                         const postDimension = `INSERT INTO Dimension (Type, Size, Thickness, Finish)
//                                                Values ("${dimension.type}", "${dimension.size}", "${dimension.thickness}", "${dimension.finish}")`;

//                         mysqlConnection.query(
//                           postDimension,
//                           function (err, postDimensionResult) {
//                             if (err) {
//                               reject(err);
//                               mysqlConnection.rollback(() => {
//                                 console.error("Error in create dimension");
//                               });
//                               return res.status(400).json({
//                                 success: false,
//                                 msg: "Error in create dimensions",
//                               });
//                             }
//                             resolve(postDimensionResult);
//                             const dimensionID = postDimensionResult.insertId;

//                             const postProductQuery = `INSERT INTO Products (ProdNameID, DimensionID, SalePrice, Updated_Date)
//                                       VALUES (${idProductName ?? prodNameID}, ${dimensionID}, ${dimension.price}, "${formattedDate}")`;

//                             mysqlConnection.query(
//                               postProductQuery,
//                               function (err, postProductResult) {
//                                 if (err) {
//                                   reject(err);
//                                   console.log(`Error in post product: ${err}`);
//                                   return mysqlConnection.rollback(function (
//                                     err
//                                   ) {
//                                     throw err;
//                                   });
//                                 }
//                                 resolve(postProductResult);
//                                 console.log(
//                                   `Create product successful productId:${postProductResult.insertId}`
//                                 );
//                               }
//                             );
//                           }
//                         );
//                       } else {
//                         const dimensionID = getDimensionResult[0].DimensionID;

//                         const getProduct = `SELECT * FROM Products WHERE ProdNameID = "${idProductName}" AND DimensionID = "${dimensionID}"`

//                         mysqlConnection.query(getProduct, function(err, getProductResult) {
//                           if (err) {
//                             reject(err)
//                             console.log("Error in get product")
//                             return mysqlConnection.rollback(function(err) {
//                               throw err
//                             })
//                           }
//                           console.log("product", getProductResult)
//                           if (getProductResult.length) {
//                             reject(getProductResult)
//                             console.log("Product already exists")
//                             return mysqlConnection.rollback(function(err) {
//                               throw err
//                             })
//                             // return res.status(400).json({msg:"Product already exists", success: false})
//                           }

//                         const postProductQuery = `INSERT INTO Products (ProdNameID, DimensionID, SalePrice, Updated_Date)
//                                       VALUES (${idProductName ?? prodNameID}, ${dimensionID}, ${dimension.price}, "${formattedDate}")`;

//                         mysqlConnection.query(
//                           postProductQuery,
//                           function (err, postProductResult) {
//                             if (err) {
//                               reject(err);
//                               console.log(`Error in post product: ${err}`);
//                               return mysqlConnection.rollback(function (err) {
//                                 throw err;
//                               });
//                             }
//                             resolve(postProductResult);

//                             console.log(
//                               `Create product successful productId:${postProductResult.insertId}`
//                             );
//                           }
//                         );
//                       })
//                       }
//                     }
//                   );
//                 });
//               });

//               await Promise.all(postProducts);

//               mysqlConnection.commit(function (err) {
//                 if (err) {
//                   console.log(
//                     `Error in commit transaction post product: ${err}`
//                   );
//                   res.status(500).json({
//                     success: false,
//                     msg: "Error in post product commit",
//                     error: err,
//                   });
//                   mysqlConnection.rollback(function (err) {
//                     throw err;
//                   });
//                 }
//                 console.log("Commit transaction post product successful");
//                 return res
//                   .status(200)
//                   .json({ success: true, msg: "Create product successful" });
//               });

//         }
//       );
//   } catch (error) {
//     console.log(`General Error`);
//     // res.status(400).json({ msg: "General error in create products" });
//     mysqlConnection.rollback(function (err) {
//       throw "General error" + err;
//     });
//   }
// });

productsRouter.get("/materials", async function (req, res) {
  query_ = `SELECT DISTINCT ProdNames.Material FROM ProdNames WHERE ProdNames.Material IS NOT NULL`;
  try {
    mysqlConnection.query(query_, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        console.log("Error en get materials");
        res.status(200).json({});
      } else {
        res
          .status(200)
          .json({ msg: "Get materials successful", data: results });
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

productsRouter.get("/id/:id", async function (req, res) {
  const { id } = req.params;
  query_ = `SELECT
                  ProdNames.Naturali_ProdName AS ProductName,
                  ProdNames.Material,
                  Dimension.Type,
                  Dimension.Size,
                  Dimension.Finish,
                  Dimension.Thickness,
                  Products.SalePrice AS Price,
                  Products.ProdID,
                  Products.Notes,
                  Inventory.*,
                  Products.Sale_Flag,
                  Products.Sale_Rate
                FROM Products
                INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID WHERE Products.ProdID = ${id}  
                ORDER BY ProdNames.Naturali_ProdName ASC`;

  try {
    mysqlConnection.query(query_, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        console.log("Error en productsRoutes.get /:id");
        res.status(200).json({});
      } else {
        console.log("Data OK");
        res.status(200).json(results[0]);
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

productsRouter.get("/filtered", async function (req, res) {
  let { finish, size, thickness, material, search, sqft1, sqft2, type } =
    req.query;
  const sqftMin = sqft1 === "" ? 0 : sqft1;
  const sqftMax = sqft2 === "" ? 99999999 : sqft2;

  const query = `
    SELECT    
      ProdNames.Naturali_ProdName AS ProductName,
      ProdNames.ProdNameID,
      ProdNames.Material,
      Dimension.Type,
      Dimension.Size,
      Dimension.Finish,
      Dimension.Thickness,
      Dimension.SQFT_per_Slab,
      Products.SalePrice AS Price,
      Products.ProdID,
      Inventory.*,
      Products.Discontinued_Flag,
    CASE
      WHEN Dimension.Type = 'Tile' THEN Inventory.InStock_Available + Inventory.InComing_Available
      WHEN Dimension.Type = 'Slab' THEN (Inventory.InStock_Available + Inventory.InComing_Available) * Dimension.SQFT_per_Slab
    END AS sqft
    FROM Products
    INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
    INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID 
    WHERE (Inventory.InStock_Available > 0 OR Inventory.Incoming_Available > 0)
    
    ${material.length ? `AND (ProdNames.Material = "${material}")` : ``}
    ${type.length ? `AND (Dimension.Type = "${type}")` : ``}
    ${finish.length ? `AND (Dimension.Finish = "${finish}")` : ``}
    ${size.length ? ` AND (Dimension.Size = "${size}")` : ``}
    ${thickness.length ? `AND (Dimension.Thickness = "${thickness}")` : ``}
    ${
      search.length
        ? `AND (LOWER(ProdNames.Naturali_ProdName) LIKE LOWER('%${search}%'))`
        : ``
    }
    ORDER BY ProdNames.Naturali_ProdName ASC
    `;

  try {
    mysqlConnection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        res.status(200).json({ results, errorSearch: [] });
        //se elimino codigo que estaba demas al no traer length el result
      } else {
        const sqftMinMax = getSqftMaxMin(results);
        let price = findMaxMinPrice(results);
        let filteredValues = prodValues(
          results,
          search,
          price,
          sqftMinMax,
          sqftMin,
          sqftMax
        );
        let errorSearch = {};
        if (sqftMin > 0 || sqftMax < 99999999) {
          results = results.filter(
            (item) => item.sqft > sqftMin && item.sqft < sqftMax
          );
        }
        results = results.sort((a, b) => {
          const nameA = a.ProductName.toUpperCase();
          const nameB = b.ProductName.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        res.status(200).json({ results, errorSearch, filteredValues });
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

productsRouter.patch("/product/:id", async function (req, res) {
  const { id } = req.params;
  const { product } = req.body;
  const val =
    product.flag === undefined
      ? null
      : product.flag === true
      ? "False"
      : "True";
  const valSale =
    product.saleFlag === undefined
      ? null
      : product.saleFlag === true
      ? "False"
      : "True";
  const updateColumnProduct = [];

  if (valSale && valSale !== undefined)
    updateColumnProduct.push(`Sale_Flag = "${valSale}"`);

  if (val && val !== undefined)
    updateColumnProduct.push(`Discontinued_Flag = "${val}"`);

  if (product.productRate)
    updateColumnProduct.push(`Sale_Rate = ${product.productRate}`);

  const updateColumnProductString = updateColumnProduct.join(", ");

  query_ = `UPDATE Products SET ${updateColumnProductString} WHERE ProdID = ${id}`;

  try {
    mysqlConnection.query(query_, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        console.log(`Failure updating prodcut ${id}`);
        res.status(200).json("");
      } else {
        console.log("updating OK");
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

module.exports = productsRouter;
