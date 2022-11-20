const express = require('express')
const productsRouter = express.Router()
const mysqlConnection = require('../db')

productsRouter.get('/', async function(req, res){

    query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
                LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID`;

    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

productsRouter.get('/:id', async function(req, res){

    const {id} = req.params

    query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
                LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID WHERE ProdNameID = ${id}`;

    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

// productsRouter.get('/:name', async function(req, res){
    
//     const {name} = req.params
    
//     query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
//                 LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID WHERE Reference = ${name}`;

//     try{
//         mysqlConnection.query(query_, function(error, results, fields){   

//             if(error) throw error;
//             if(results.length == 0) {
//                 console.log('Error al obtener data!')
//                 res.status(200).json({});
//             } else {
//                 console.log('Data OK')
//                 res.status(200).json(results);
//             }
//         });
//     } catch(error){
//         res.status(409).send(error);
//     }
// });

module.exports = productsRouter;