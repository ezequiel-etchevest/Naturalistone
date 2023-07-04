const express = require('express')
const samplesRoutes = express.Router();
const mysqlConnection = require('../db');

samplesRoutes.get('/', function(req, res) {
  const { customer } = req.query

  const query_ = `SELECT Samples.*, Customers.Company, Projects.ProjectName FROM Samples
  LEFT JOIN Customers ON Customers.CustomerID = Samples.CustomerID
  LEFT JOIN Projects ON Projects.idProjects = Samples.ProjectID
  ${
    customer ? 
    `WHERE (Customers.Company LIKE LOWER('%${customer}%') OR Customers.Contact_Name LIKE LOWER('%${customer}%'))`
    : (` `)
}`

  try {
    mysqlConnection.query(query_, function(errors, results, fields) {
      if (!results.length) {
        return res.status(400).json({success: false, data:'Error in samplesRoutes /'});     
      };

      return res.status(200).json({success: true, data: results})
    });
    
    } catch (error) {
      console.log(error)
      return res.status(400).json({success: false, data: 'Error in get data samples /'})
  }

});


samplesRoutes.get('/samplesProducts/:sampleId', function(req, res) {

  const { sampleId } = req.params

  const query_ = `SELECT  Samples_Products.ProdID, Samples_Products.Quantity, Products.DimensionID, ProdNames.Naturali_ProdName, Dimension.Type, Dimension.Finish 
  FROM Samples
  LEFT JOIN Samples_Products ON Samples_Products.sampleID = Samples.idSamples
  LEFT JOIN Products ON Products.ProdID = Samples_Products.ProdID
  LEFT JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
  LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
  WHERE Samples.idSamples = ${sampleId}`

  mysqlConnection.query(query_, function(error, results, fields) {
    try {
      if (!results.length) {
        return res.status(400).json('error in get sampleProducts /')
      }
      
      return res.status(200).json(results)
      
    } catch (error) {
      return res.status(400).json('error in get sampleProducts/')
    }
    })
  })

samplesRoutes.post('/', function(req, res) {
  const {customer, project, products, variables} = req.body

  const parsedProducts = Object.entries(products)
  .flat()
  .filter((element) => typeof element === 'object')
  .map((product, index) => ({ variableName: `${index + 1}`, ...product }));

  try {
    
    mysqlConnection.beginTransaction(function(err) {
      if (err) {
        return res.status(400).json({success: false, msg:'error in post /sample' + err})
      }

      const clausulasWhere = [];

    // Recorrer el array de valores y construir las cláusulas WHERE
     parsedProducts.forEach(valores => {
     const clausula = `Material = '${valores.type}' AND Type = 'Sample' AND Finish = '${valores.finish}'`;
     clausulasWhere.push(clausula);
    });

// Construir la consulta SELECT
    const sqlSelect = `SELECT * FROM Dimension WHERE ${clausulasWhere.join(' OR ')}`;
    
    mysqlConnection.query(sqlSelect, function(err, results, fields) {
      if (err) {
        res.status(400).json({ success: false, msg: 'error in create samples in post /sample' });
        return mysqlConnection.rollback(function() {
          throw err;
        });
      }
        // Obtener los valores existentes en la tabla
  const valoresExistente = results.map(result => ({
    material: result.Material,
    type: result.Type,
    finish: result.Finish,
  }));

  // Filtrar los valores existentes
  const valoresNoExistentes = parsedProducts.filter(valores => {
    return !valoresExistente.some(existente =>
      existente.material === valores.type &&
      existente.finish === valores.finish
    );
  });

  // Verificar si hay valores no existentes
  if (valoresNoExistentes.length > 0) {
    // Construir la consulta INSERT
    const sqlInserts = valoresNoExistentes.map(valores => {
      return `INSERT INTO NaturaliStone.Dimension (Material, Type, Finish) VALUES ('${valores.type}', 'Sample', '${valores.finish}')`;
    });

    sqlInserts.forEach(sqlInsert => {
      mysqlConnection.query(sqlInsert, function(err, result) {
        if (err) {
          return mysqlConnection.rollback(function() {
            throw err;
          });
        }
      })
    })
  }


      const query_1 = `INSERT INTO Samples (CustomerID, ProjectID, TrackingNumber)
      VALUES (${customer.CustomerID}, ${project.idProjects}, ${variables.trackingNumber})`

      mysqlConnection.query(query_1, function(err, results, field) {

        if(err) {
          res.status(400).json({success: false, msg:'error in create samples in post /sample'})
          return mysqlConnection.rollback(function() {
            throw err;
          });
        }
        
        const sampleID = results.insertId; // ID generado de consulta anterior

        console.log(parsedProducts)

        const query_2 = `INSERT INTO Samples_Products (SampleID, ProdID, Quantity) Values ?`
        const sampleProductsValue = parsedProducts.map((elem) => [sampleID, elem.prodID, elem.quantity])
        
        mysqlConnection.query(query_2, sampleProductsValue, async function(error, results, fields){
          if (error) {
            console.log('Error in sampleroutes.post /samples ' + error);
            console.log('Retrying ProdSold insert after 0.5 seconds...');
            
            setTimeout(() => {
              mysqlConnection.query(query_2, [sampleProductsValue], async function(error, prodSoldResult, fields) {
                if (error) {
                  console.log('Error in sampleroutes.post /samples ' + error);
                  res.status(500).json('Failed to insert ProdSold');
                  return mysqlConnection.rollback(function() {
                    throw error;
                  });
                }
                
                console.log('Products inserted successfully (retry)');
                commitTransaction();
              });
            }, 500);
            return;
          }

          console.log('Products inserted successfully');

          commitTransaction();
        })
    })
  })
})
    
  } catch (error) {
    return res.status(400).json({success: false, msg: 'Error in samples routes post /samples' + error})
  }

  function commitTransaction() {
    mysqlConnection.commit(function(err) {
      if (err) {
        console.log('Error in samplesRoutes.post /samples ' + err);
        res.status(500).json('Failed to create quote');
        return mysqlConnection.rollback(function() {
          throw err;
        });
      }
  
      console.log('Transaction committed successfully');
      res.status(200).json({success: true, msg:'samples create successful'});
    });
  }

})

module.exports = samplesRoutes