const express = require("express");
const samplesRoutes = express.Router();
const mysqlConnection = require("../db");
const parseProducts = require("../Controllers/samplesController");

samplesRoutes.get("/", function (req, res) {

  const query_ = `SELECT Samples.*, Customers.Company, Projects.ProjectName FROM Samples
  LEFT JOIN Customers ON Customers.CustomerID = Samples.CustomerID
  LEFT JOIN Projects ON Projects.idProjects = Samples.ProjectID ORDER BY idSamples DESC`;

  try {
    mysqlConnection.query(query_, function (errors, results, fields) {
      if (!results.length) {
        return res
          .status(400)
          .json({ success: false, data: "Error in samplesRoutes /" });
      } else{
        return res.status(200).json({ success: true, data: results });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: "Error in get data samples /" });
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

samplesRoutes.post("/", function (req, res) {
  const { customer, project, products, variables } = req.body;
  
  const parsedProducts = parseProducts(products)

  try {
    mysqlConnection.beginTransaction(function (err) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "error in post /sample" + err });
      }

      const clausulasWhere = [];

      // Recorrer el array de valores y construir las cláusulas WHERE
      parsedProducts.forEach((valores) => {
        const clausula = `Dimension.Material = '${valores.type}' AND Dimension.Type = 'Sample' 
     AND Dimension.Finish = '${valores.finish}' AND ProdNames.ProdNameID = ${valores.prodNameID}`;
        clausulasWhere.push(clausula);
      });

      // Construir la consulta SELECT
      const sqlSelect = `SELECT Products.ProdID, Products.ProdNameID, Dimension.Material, Dimension.Type, 
    Dimension.Finish FROM Products
    LEFT JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
    WHERE ${clausulasWhere.join(" OR ")}`;
      // const sqlSelect = `SELECT * FROM Dimension WHERE ${clausulasWhere.join(' OR ')}`;

      mysqlConnection.query(sqlSelect, async function (err, results, fields) {
        if (err) {
          res.status(400).json({
            success: false,
            msg: "error in create samples in post /sample",
          });
          return mysqlConnection.rollback(function () {
            throw err;
          });
        }
        // Obtener los valores existentes en la tabla
        const valoresExistente = results.map((result) => ({
          prodId: result.ProdID,
          material: result.Material,
          type: result.Type,
          finish: result.Finish,
        }));

        // Filtrar los valores existentes
        const valoresNoExistentes = parsedProducts.filter((valores) => {
          return !valoresExistente.some(
            (existente) =>
              existente.material === valores.type &&
              existente.finish === valores.finish
          );
        });

        let prodIds;

        // Verificar si hay valores no existentes
        if (valoresNoExistentes.length > 0) {
          const sqlInserts = valoresNoExistentes.map((valores) => {
            const query_ = `INSERT INTO Dimension (Material, Type, Finish) Values ('${valores.type}', 'Sample', '${valores.finish}')`;

            return new Promise((resolve, reject) => {
              mysqlConnection.query(query_, function (err, results, field) {
                if (err) {
                  reject(err);
                  return mysqlConnection.rollback(function () {
                    throw err;
                  });
                }

                const newDimensionId = results.insertId;

                const query_1 = `INSERT INTO Products (ProdNameID, DimensionID) Values ('${valores.prodNameID}', '${newDimensionId}')`;

                mysqlConnection.query(query_1, function (err, results, field) {
                  if (err) {
                    reject(err);
                    return mysqlConnection.rollback(function () {
                      throw err;
                    });
                  }
                  const newProductId = results.insertId;
                  resolve(newProductId);
                });
              });
            });
          });

          // Esperar a que se completen todas las consultas y obtener los prodID generados
          const prodIdPromises = Promise.all(sqlInserts);

          // Obtener los prodID en una variable

          prodIds = await prodIdPromises;

          const query_2 = `INSERT INTO Samples (CustomerID, ProjectID, TrackingNumber, EstDelivery_Date)
      VALUES (${customer.CustomerID}, ${project.idProjects}, ${variables.trackingNumber}, "${variables.estDelivDate}" )`;

          mysqlConnection.query(query_2, function (err, results, field) {
            if (err) {
              res.status(400).json({
                success: false,
                msg: "error in create samples in post /sample",
              });
              return mysqlConnection.rollback(function () {
                throw err;
              });
            }

            const sampleID = results.insertId; // ID generado de consulta anterior

            const query_3 = `INSERT INTO Samples_Products (SampleID, ProdID) Values ?`;
            const sampleProductsValue = prodIds.map((elem) => [sampleID, elem]);

            mysqlConnection.query(
              query_3,
              sampleProductsValue,
              async function (error, results, fields) {
                if (error) {
                  console.log("Error in sampleroutes.post /samples " + error);
                  console.log("Retrying ProdSold insert after 0.5 seconds...");

                  setTimeout(() => {
                    mysqlConnection.query(
                      query_3,
                      [sampleProductsValue],
                      async function (error, prodSoldResult, fields) {
                        if (error) {
                          console.log(
                            "Error in sampleroutes.post /samples " + error
                          );
                          res.status(500).json("Failed to insert ProdSold");
                          return mysqlConnection.rollback(function () {
                            throw error;
                          });
                        }

                        console.log("Products inserted successfully (retry)");
                        commitTransaction();
                      }
                    );
                  }, 500);
                  return;
                }

                console.log("Products inserted successfully");

                commitTransaction();
                return;
              }
            );
          });
          return;
        }

        const query_4 = `INSERT INTO Samples (CustomerID, ProjectID, TrackingNumber, EstDelivery_Date)
      VALUES (${customer.CustomerID}, ${project.idProjects}, "${variables.trackingNumber}", "${variables.estDelivDate}")`;

        mysqlConnection.query(query_4, function (err, results, field) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: "error in create samples in post /sample",
            });
            return mysqlConnection.rollback(function () {
              throw err;
            });
          }

          const sampleID = results.insertId; // ID generado de consulta anterior

          const query_5 = `INSERT INTO Samples_Products (SampleID, ProdID) Values ?`;
          const sampleProductsValue = valoresExistente.map((elem) => [
            sampleID,
            elem.prodId,
          ]);

          mysqlConnection.query(
            query_5,
            sampleProductsValue,
            async function (error, results, fields) {
              if (error) {
                console.log("Error in sampleroutes.post /samples " + error);
                console.log("Retrying ProdSold insert after 0.5 seconds...");

                setTimeout(() => {
                  mysqlConnection.query(
                    query_5,
                    [sampleProductsValue],
                    async function (error, prodSoldResult, fields) {
                      if (error) {
                        console.log(
                          "Error in sampleroutes.post /samples " + error
                        );
                        res.status(500).json("Failed to insert ProdSold");
                        return mysqlConnection.rollback(function () {
                          throw error;
                        });
                      }

                      console.log("Products inserted successfully (retry)");
                      commitTransaction();
                    }
                  );
                }, 500);
                return;
              }

              console.log("Products inserted successfully");

              commitTransaction();
            }
          );
        });
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error in samples routes post /samples" + error,
    });
  }

  function commitTransaction() {
    mysqlConnection.commit(function (err) {
      if (err) {
        console.log("Error in samplesRoutes.post /samples " + err);
        res.status(500).json("Failed to create quote");
        return mysqlConnection.rollback(function () {
          throw err;
        });
      }

      console.log("Transaction committed successfully");
      res.status(200).json({ success: true, msg: "samples create successful" });
    });
  }
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


module.exports = samplesRoutes;
