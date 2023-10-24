const express = require("express");
const samplesRoutes = express.Router();
const mysqlConnection = require("../db");
const parseProducts = require("../Controllers/samplesController");

samplesRoutes.get("/", function (req, res) {

  const { search, sellerId } = req.query;

  let query = `SELECT Samples.*, CONVERT_TZ(EstDelivery_Date, 'UTC', 'America/New_York') + INTERVAL 1 DAY AS EstDelivery_Date, Customers.Company, Customers.Contact_Name, Customers.SellerID, Projects.ProjectName 
    FROM Samples
    LEFT JOIN Customers ON Customers.CustomerID = Samples.CustomerID
    LEFT JOIN Projects ON Projects.idProjects = Samples.ProjectID`;

  const queryParams = [];

  if (sellerId !== '3') {
    query += ` WHERE Customers.SellerID = ?`;
    queryParams.push(sellerId);
  }

  if (search) {
    if (queryParams.length > 0) {
      query += ` AND `;
    } else {
      query += ` WHERE `;
    }
    query += ` (LOWER(Customers.Company) LIKE ? OR LOWER(Customers.Contact_Name) LIKE ?)`;
    queryParams.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
  }

  // Agregar ordenamiento
  query += ` ORDER BY idSamples DESC`;

  try {
    mysqlConnection.query(query, queryParams, function (errors, results, fields) {
      if (!results.length) {
        return res.status(200).json({ success: false, data: [], msg: "No samples found" });
      } else {
        return res.status(200).json({ success: true, data: results });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, data: "Error in get data samples /" });
  }
});


samplesRoutes.get("/samplesProducts/:sampleId", function (req, res) {
  const { sampleId } = req.params;

  const query_ = `SELECT  Samples_Products.ProdID, Samples_Products.Quantity, Products.DimensionID, ProdNames.Naturali_ProdName, ProdNames.Material, Dimension.Type, Dimension.Finish 
  FROM Samples
  LEFT JOIN Samples_Products ON Samples_Products.sampleID = Samples.idSamples
  LEFT JOIN Products ON Products.ProdID = Samples_Products.ProdID
  LEFT JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
  LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
  WHERE Samples.idSamples = ${sampleId}`;

  mysqlConnection.query(query_, function (error, results, fields) {
    try {
      if (!results.length) {
        return res.status(400).json("error in get sampleProducts /");
      }

      return res.status(200).json(results);
    } catch (error) {
      return res.status(400).json("error in get sampleProducts/");
    }
  });
});

samplesRoutes.get("/validation/:trackingNumber", function (req, res) {

  const { trackingNumber } = req.params

  const query_ = `SELECT * FROM NaturaliStone.Samples WHERE Samples.TrackingNumber = "${trackingNumber}"`;

  try {
    mysqlConnection.query(query_, function (errors, results, fields) {
      if (!results.length) {
        return res
          .status(200)
          .json({ success: false });
      }
      return res.status(200).json({ success: true, data: results[0] });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false });
  }
});

samplesRoutes.delete("/:sampleId", function(req, res) {
  const { sampleId } = req.params;

  try {
    const deleteSampleQuery = `Delete FROM Samples WHERE idSamples = ${sampleId}`

    mysqlConnection.query(deleteSampleQuery, function(err, results) {
      if (err) {
        return res.status(400).json({success: false, msg: "Error in delete sample", error: err})
      }
      console.log("Delete sample successful")
      return res.status(200).json({success: true, msg:"Delete sample successful"})
    })
  } catch (error) {
      return res.status(500).json({success: true, msg:"General error in delete sample"})
  }
})


// Función para ejecutar una consulta SQL con parámetros
function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, values, function (err, results, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Función para ejecutar una consulta de inserción y obtener el ID generado
function executeInsertAndGetId(query, values = []) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, values, function (err, results, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

samplesRoutes.post("/", async function (req, res) {
  const { customer, project, products, variables } = req.body;

  const parsedProducts = parseProducts(products);

  try {
    await startTransaction();
    //Busca todas las dimensiones tipo sample que haya en la db y trae sus dimensionID + su finish
    const allDimensions = await selectAllDimensions()
    //Mapea parsedProducts y se queda con aquellos productos que ya esten guardados en la db con tipo ProdNameId Sample y finish
    const existing = await selectExistingProducts(parsedProducts);
    const existingProducts = existing.existingProducts

    //Se queda con un array donde unicamente esten los ProdID de los productos existentes de tipo sample
    const existingProductIds = existingProducts.map(product => product.ProdID);

    //Genera un array de objetos que no estan en la db con el tipo Sample, los crea en la db y retorna sus ids.
    // const newProducts = await getNewProducts(parsedProducts, existingProducts);
    //Guarda los IDs de los nuevos productos creados
    const newProducts = existing.nonExistingProducts
    const prodIds = await insertNewProducts(newProducts, allDimensions);

    //Combina los Ids de los productos existentes y los Ids de los nuevos productos para generer un unico array de Ids.
    const combinedProductIds = existingProductIds.concat(prodIds);

    const sampleID = await insertSample(customer.CustomerID, project.idProjects, variables.trackingNumber, variables.estDelivDate);
    
    await insertSampleProducts(sampleID, combinedProductIds);
    
    await commitTransaction();

    return res.status(200).json({ success: true, msg: "samples create successful" });
  } catch (error) {
    console.error("Error in samples routes post /samples", error);
    return res.status(400).json({ success: false, msg: "Error in samples routes post /samples" });
  }
});

function startTransaction() {
  return new Promise((resolve, reject) => {
    mysqlConnection.beginTransaction(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// function selectExistingProducts(parsedProducts) {
//   const clausulasWhere = parsedProducts.map((valores) => {
//     return `ProdNames.Material = '${valores.type}' AND Dimension.Type = 'Sample' 
//       AND Dimension.Finish = '${valores.finish}' AND ProdNames.ProdNameID = ${valores.prodNameID}`;
//   });

//   const sqlSelect = `
//     SELECT Products.ProdID, Products.ProdNameID, ProdNames.Material, Dimension.Type, 
//     Dimension.Finish FROM Products
//     LEFT JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
//     LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
//     WHERE ${clausulasWhere.join(" OR ")}
//   `;

//   return executeQuery(sqlSelect);
// }
async function selectExistingProducts(parsedProducts) {
  const clausulasWhere = parsedProducts.map((valores) => {
    return `ProdNames.Material = '${valores.type}' AND Dimension.Type = 'Sample' 
      AND Dimension.Finish = '${valores.finish}' AND ProdNames.ProdNameID = ${valores.prodNameID}`;
  });

  const sqlSelect = `
    SELECT Products.ProdID, Products.ProdNameID, ProdNames.Material, Dimension.Type, 
    Dimension.Finish FROM Products
    LEFT JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
    WHERE ${clausulasWhere.join(" OR ")}
  `;

  try {
    const results = await executeQuery(sqlSelect);

    // Divide los resultados en dos arrays: existentes y no existentes
    const existingProducts = [];
    const nonExistingProducts = [];

    for (const valores of parsedProducts) {
      const existingProduct = results.find((existente) => (
        existente.Material === valores.type &&
        existente.Finish === valores.finish &&
        existente.Type === 'Sample'
      ));
      
      if (existingProduct) {
        existingProducts.push(existingProduct);
      } else {
        nonExistingProducts.push(valores);
      }
    }
    return { existingProducts, nonExistingProducts };
  } catch (error) {
    throw error;
  }
}


// function getNewProducts(parsedProducts, existingProducts) {
//   return parsedProducts.filter((valores) => {
//     return !existingProducts.some((existente) => (
//       existente.Material === valores.type &&
//       existente.Finish === valores.finish
//     ));
//   });
// }



async function insertNewProducts(newProducts, allDimensions) {
  const promises = newProducts.map(async (valores) => {
    const dimension = allDimensions.find(dim => valores.finish === dim.Finish);
    const newProductId = await insertProduct(valores.prodNameID, dimension.UniqueDimensionID);
    return newProductId;
  });

  return await Promise.all(promises);
}

function selectAllDimensions() {
  const query = `SELECT Finish, MIN(DimensionID) AS UniqueDimensionID FROM Dimension WHERE Type = 'Sample' GROUP BY Finish;`;
  return executeQuery(query);
}

function insertProduct(prodNameID, dimensionID) {
  const query = `INSERT INTO Products (ProdNameID, DimensionID) VALUES (?, ?)`;
  return executeInsertAndGetId(query, [prodNameID, dimensionID]);
}

function insertSample(customerID, projectID, trackingNumber, estDelivDate) {
  const query = `INSERT INTO Samples (CustomerID, ProjectID, TrackingNumber, EstDelivery_Date) VALUES (?, ?, ?, ?)`;
  return executeInsertAndGetId(query, [customerID, projectID, trackingNumber, estDelivDate]);
}

function insertSampleProducts(sampleID, prodIds) {
  const values = prodIds.map((elem) => [sampleID, elem]);
  const query = `INSERT INTO Samples_Products (SampleID, ProdID) VALUES ?`;

  return executeQuery(query, [values]);
}


function commitTransaction() {
  return new Promise((resolve, reject) => {
    mysqlConnection.commit(function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("Transaction committed successfully");
        resolve();
      }
    });
  });
}

module.exports = samplesRoutes;
