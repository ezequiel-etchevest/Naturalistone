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
const {
  getFormattedDate,
  getProductIDByName,
  createProductName,
  getOrCreateDimension,
  createProductEntry
} = require("../Controllers/productsController");

productsRouter.get("/search_prodname", async function (req, res) {
  let { search } = req.query;
  
  const query = `
    SELECT
    ProdNames.Naturali_ProdName AS ProductName,
    ProdNames.ProdNameID,
    ProdNames.Material
    FROM NaturaliStone.ProdNames
    WHERE ProdNames.Naturali_ProdName IS NOT NULL
      ${search.length ? `AND (LOWER(ProdNames.Naturali_ProdName) LIKE LOWER('%${search}%'))` : ``}
    ORDER BY ProdNames.Naturali_ProdName ASC`;

  try {
    mysqlConnection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        res.status(200).json({ results, errorSearch: [] });
        //se elimino codigo que estaba demas al no traer length el result
      } else {

        res.status(200).json({ results });
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});


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
  
  const sqftMin = sqft1 === undefined ? 0 : sqft1;
  const sqftMax = sqft2 === undefined ? 99999999 : sqft2;

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
          WHEN Dimension.Type = 'Tile' THEN Inventory.InStock_Available + Inventory.Incoming_Available
          WHEN Dimension.Type = 'Mosaic' THEN Inventory.InStock_Available + Inventory.Incoming_Available
          WHEN Dimension.Type = 'Slab' THEN (Inventory.InStock_Available + Inventory.Incoming_Available) * Dimension.SQFT_per_Slab
      END AS sqft
    FROM Products
    INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
    INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID
    WHERE ProdNames.Naturali_ProdName IS NOT NULL AND Dimension.Size IS NOT NULL
      ${material.length ? `AND (ProdNames.Material = "${material}")` : ``}
      ${type.length ? `AND (Dimension.Type = "${type}")` : ``}
      ${finish.length ? `AND (Dimension.Finish = "${finish}")` : ``}
      ${size.length ? `AND (Dimension.Size = "${size}")` : ``}
      ${thickness.length ? `AND (Dimension.Thickness = "${thickness}")` : ``}
      ${search.length ? `AND (LOWER(ProdNames.Naturali_ProdName) LIKE LOWER('%${search}%'))` : ``}
    ORDER BY sqft DESC`;

  try {
    mysqlConnection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        res.status(200).json({ results, errorSearch: [] });
        //se elimino codigo que estaba demas al no traer length el result
      } else {

        const sqftMinMax = getSqftMaxMin(results);

        if (sqftMin >= 0 || sqftMax < 99999999) {
          results = results.filter(
            (item) => item.sqft >= sqftMin && item.sqft <= sqftMax
          );
        }

        let price = findMaxMinPrice(results);
        let errorSearch = {};
        let filteredValues = prodValues(
          results,
          search,
          price,
          sqftMinMax
        );
        // results = results.sort((a, b) => {
        //   const nameA = a?.ProductName?.toUpperCase();
        //   const nameB = b?.ProductName?.toUpperCase();
        //   if (nameA < nameB) return -1;
        //   if (nameA > nameB) return 1;
        //   return 0;
        // });
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
