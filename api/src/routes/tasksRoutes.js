const express = require('express')
const tasksRouter = express.Router()
const mysqlConnection = require('../db');
const executeQuery = require('../Controllers/taskRoutesController');


tasksRouter.get('/all-tasks', async function(req, res){
    console.log(req.query)
    const { SellerID, Status } = req.query
    
    let query_ = `
        SELECT NaturaliStone.Tasks.*
        FROM Tasks
        WHERE Tasks.SellerID = ${SellerID} AND Status= "${Status}"`;
    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(!results) {
                console.log('Error al obtener tasks data!')
                res.status(400).json(error);
            } else {
                console.log('Tasks OK')
                if(!results.length) res.status(200).send('No tasks')
                else res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

tasksRouter.get('/comments/:TaskID', async function(req, res){

    const { TaskID } = req.params

    let query_ = `
        SELECT Task_Comments.*, Seller.*
        FROM Task_Comments
        LEFT JOIN Seller ON Task_Comments.By = Seller.SellerID
        WHERE  Task_Comments.TaskID = ${TaskID}`;
    try{
        mysqlConnection.query(query_, function(error, results, fields){
                console.log('Comments OK')
                if(!results.length) res.status(200).send('No Comments')
                else res.status(200).json(results);
        });
    } catch(error){
        res.status(409).send(error);
    }
});

tasksRouter.get('/id/:TaskID', async function(req, res){
    const { TaskID } = req.query

    let query_ = `
        SELECT NaturaliStone.Tasks.*
        FROM Tasks
        WHERE Tasks.TaskID = ${TaskID}`;
    let query_2 = `
        SELECT NaturaliStone.Tasks_Comments.*
        FROM Tasks_Comments
        WHERE Tasks_Comments.TaskID = ${TaskID}`;

    try{
        const results = await Promise.all([
            executeQuery(query_),
            executeQuery(query_2)
        ]);

        if (!results[0].length) {
            console.log('Error al obtener tasks data!')
            res.status(400).json(error);
        } else {
            console.log('Tasks OK')
            if (!results[1].length) res.status(200).send('No tasks')
            else res.status(200).json(results);
        }
    } catch(error){
        res.status(409).send(error);
    }
});

tasksRouter.post('/new-comment', async function(req, res) {
    const { Description, By, Date, TaskID } = req.body;
  
    const query = `INSERT INTO Task_Comments (Description, \`By\`, Date, TaskID) 
                   VALUES ("${Description}", "${By}", "${Date}", "${TaskID}")`;
  
    try {
      mysqlConnection.query(query, function(error, results, fields) {
        if (error) {
          console.log('Error en salesRoutes.get /new-comment');
          console.log(error)
          res.status(200).json('');
        } else {
          console.log('Comment created successfully');
          res.status(200).json(results);
        }
      });
    } catch (error) {
      res.status(409).send(error);
    }
  });
  
tasksRouter.post('/new-task', async function(req, res){
    console.log(req.body)
    const {
        taskID,
        Description,
        Title,
        CustomerID,
        ProjectID,
        InvoiceID,
        SellerID
    } = req.body

    query_ = `INSERT INTO Tasks (taskID, Description, Title, Status, CustomerID, ProjectID, InvoiceID, SellerID) 
    VALUES ("${taskID}", "${Description}", "${Title}", "todo", "${CustomerID}", "${ProjectID}", "${InvoiceID}", "${SellerID}")`;
    
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en salesRoutes.get /new-task')
                res.status(200).json('');
            } else {
                console.log('Task created successfully')
                res.status(200).json(results);
            }
            });
    } catch(error){
        res.status(409).send(error);
    }
});

tasksRouter.patch('/change-status/:taskID', async function(req, res){
    
    const {taskID} = req.params

    query_ = `UPDATE NaturaliStone.Tasks SET Status = 'done' WHERE taskID = ${taskID}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Failure updating status task')
                res.status(200).json('');
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(400).send(error);
    }
});

module.exports = tasksRouter
