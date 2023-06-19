 function executeQuery(query) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, function(error, results, fields){
            if (error) reject(error);
            else resolve(results);
        });
    });
}

module.exports = executeQuery