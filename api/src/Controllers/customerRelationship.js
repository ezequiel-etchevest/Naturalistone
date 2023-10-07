
// Task Created
const dropTaskCreatedTable = `
  DROP TABLE IF EXISTS \`Temp_Task_Created\`;
`;

const createTaskCreatedTable = `
  CREATE TEMPORARY TABLE \`Temp_Task_Created\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME, 
    \`User\` VARCHAR(255)
  );
`;

const insertTaskCreatedData = `
  INSERT INTO \`Temp_Task_Created\`
  SELECT DISTINCT 'Task' AS \`Type\`, 
    \`Tasks\`.\`CustomerID\`,
    \`Projects\`.\`ProjectName\`,
    CONCAT('Task Created ID ', \`Tasks\`.\`TaskID\`) AS \`Description\`,
    \`Tasks\`.\`Created\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Tasks\`
  INNER JOIN \`Projects\` 
  ON \`Tasks\`.\`CustomerID\` = \`Projects\`.\`CustomerID\` 
  AND \`Projects\`.\`idProjects\` = \`Tasks\`.\`ProjectID\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Tasks\`.\`SellerID\`;
`;

// Task Completed
const dropTaskCompletedTable = `
  DROP TABLE IF EXISTS \`Temp_Task_Completed\`;
`;

const createTaskCompletedTable = `
  CREATE TEMPORARY TABLE \`Temp_Task_Completed\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,  
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  ); 
`;

const insertTaskCompletedData = `
  INSERT INTO \`Temp_Task_Completed\`
  SELECT DISTINCT 'Task' AS \`Type\`,
    \`Tasks\`.\`CustomerID\`,
    \`Projects\`.\`ProjectName\`,
    CONCAT('Task Completed ID ', \`Tasks\`.\`TaskID\`) AS \`Description\`, 
    \`Tasks\`.\`CompletedDate\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Tasks\`
  INNER JOIN \`Projects\`
  ON \`Tasks\`.\`CustomerID\` = \`Projects\`.\`CustomerID\`
  AND \`Projects\`.\`idProjects\` = \`Tasks\`.\`ProjectID\` 
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Tasks\`.\`SellerID\`
  WHERE \`CompletedDate\` IS NOT NULL;
`;

// Task Comments
const dropTaskCommentsTable = `
  DROP TABLE IF EXISTS \`Temp_Task_Comments\`;
`;

const createTaskCommentsTable = `
  CREATE TEMPORARY TABLE \`Temp_Task_Comments\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),  
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertTaskCommentsData = `
  INSERT INTO \`Temp_Task_Comments\`
  SELECT 'Task' AS \`Type\`,
    \`Tasks\`.\`CustomerID\`,
    \`Projects\`.\`ProjectName\`,
    \`tk\`.\`Description\`,
    \`tk\`.\`Date\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Tasks\`
  INNER JOIN \`Projects\` 
  ON \`Tasks\`.\`CustomerID\` = \`Projects\`.\`CustomerID\`
  AND \`Projects\`.\`idProjects\` = \`Tasks\`.\`ProjectID\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Tasks\`.\`SellerID\`
  INNER JOIN \`Task_Comments\` \`tk\`
  ON \`tk\`.\`TaskID\` = \`Tasks\`.\`TaskID\`;
`;

// Quote Created 
const dropQuoteCreatedTable = `
  DROP TABLE IF EXISTS \`Temp_Quote_Created\`;
`;

const createQuoteCreatedTable = `
  CREATE TEMPORARY TABLE \`Temp_Quote_Created\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertQuoteCreatedData = `
  INSERT INTO \`Temp_Quote_Created\`
  SELECT 'Quote' AS \`Type\`,
    \`p\`.\`CustomerID\`,
    \`p\`.\`ProjectName\`,
    CONCAT('Quote Sent # -- ', \`Naturali_Invoice\`) AS \`Description\`,
    \`InvoiceDate\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Sales\`
  INNER JOIN \`Projects\` \`p\`
  ON \`Sales\`.\`ProjectID\` = \`p\`.\`idProjects\`
  LEFT JOIN \`Seller\` \`s\` 
  ON \`s\`.\`SellerID\` = \`Sales\`.\`SellerID\`;
`;

// Quote Modified
const dropQuoteModifiedTable = `
  DROP TABLE IF EXISTS \`Temp_Quote_Modified\`;
`;

const createQuoteModifiedTable = `
  CREATE TEMPORARY TABLE \`Temp_Quote_Modified\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),  
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertQuoteModifiedData = `
  INSERT INTO \`Temp_Quote_Modified\`
  SELECT 'Quote' AS \`Type\`,
    \`p\`.\`CustomerID\`,
    \`p\`.\`ProjectName\`,
    CONCAT('Modification of Quote # -- ', \`Naturali_Invoice\`) AS \`Description\`,
    \`LastInsertDate\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Sales\`
  INNER JOIN \`Projects\` \`p\`
  ON \`Sales\`.\`ProjectID\` = \`p\`.\`idProjects\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Sales\`.\`SellerID\`
  WHERE \`LastInsertDate\` > \`InvoiceDate\`;
`;

// Quote Status Updated
const dropQuoteStatusUpdatedTable = `
  DROP TABLE IF EXISTS \`Temp_Quote_Status_Updated\`;
`;

const createQuoteStatusUpdatedTable = `
  CREATE TEMPORARY TABLE \`Temp_Quote_Status_Updated\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,  
    \`User\` VARCHAR(255)
  );
`;

const insertQuoteStatusUpdatedData = `
  INSERT INTO \`Temp_Quote_Status_Updated\`
  SELECT 'Quote' AS \`Type\`, 
    \`p\`.\`CustomerID\`,
    \`p\`.\`ProjectName\`,
    CONCAT('Quote Status Updated # -- ', \`Naturali_Invoice\`, ' -- ', \`Sales\`.\`Status\`) AS \`Description\`,
    \`Sales\`.\`Updated_Date\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Sales\`
  INNER JOIN \`Projects\` \`p\`
  ON \`Sales\`.\`ProjectID\` = \`p\`.\`idProjects\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Sales\`.\`SellerID\`
  WHERE \`Sales\`.\`Updated_Date\` > \`InvoiceDate\`
  AND \`Sales\`.\`Status\` <> 'Canceled';
`;

// Quote Status Canceled
const dropQuoteStatusCanceledTable = `
  DROP TABLE IF EXISTS \`Temp_Quote_Status_Canceled\`;
`;

const createQuoteStatusCanceledTable = `
  CREATE TEMPORARY TABLE \`Temp_Quote_Status_Canceled\` (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertQuoteStatusCanceledData = `
  INSERT INTO \`Temp_Quote_Status_Canceled\`
  SELECT 'Quote' AS \`Type\`,
    \`p\`.\`CustomerID\`, 
    \`p\`.\`ProjectName\`,
    CONCAT('Quote Canceled # -- ', \`Naturali_Invoice\`) AS \`Description\`,
    \`Sales\`.\`Updated_Date\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Sales\`
  INNER JOIN \`Projects\` \`p\`
  ON \`Sales\`.\`ProjectID\` = \`p\`.\`idProjects\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Sales\`.\`SellerID\`
  WHERE \`Sales\`.\`Updated_Date\` > \`InvoiceDate\`
  AND \`Sales\`.\`Status\` = 'Canceled';  
`;
// Payments
const dropPaymentsTable = `
  DROP TABLE IF EXISTS Temp_Payments;
`;

const createPaymentsTable = `
  CREATE TEMPORARY TABLE Temp_Payments (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),  
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertPaymentsData = `
  INSERT INTO Temp_Payments 
  SELECT 
    'Payment' AS \`Type\`,
    \`p\`.\`CustomerID\`,
    \`p\`.\`ProjectName\`,
    CONCAT('Quote # -- ', \`Naturali_Invoice\`, ' // Payment ', \`Payments_Log\`.\`State\`, ' // Amount = ', \`Amount\`, ' // Method = ', \`Method\`) AS \`Description\`,  
    \`Date\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Sales\`
  INNER JOIN \`Projects\` \`p\`
  ON \`Sales\`.\`ProjectID\` = \`p\`.\`idProjects\`
  INNER JOIN \`Payments_Log\`
  ON \`Payments_Log\`.\`InvoiceID\` = \`Sales\`.\`Naturali_Invoice\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`Payments_Log\`.\`SellerID\`;
`;

// Samples
const dropSamplesTable = `
  DROP TABLE IF EXISTS Temp_Samples;  
`;

const createSamplesTable = `
  CREATE TEMPORARY TABLE Temp_Samples (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertSamplesData = `
  INSERT INTO Temp_Samples
  SELECT
    'Samples' AS \`Type\`,
    \`p\`.\`CustomerID\`,
    \`p\`.\`ProjectName\`, 
    CONCAT('Tracking Number: ', \`TrackingNumber\`, ' // Products: ', \`Products\`) AS \`Description\`,
    \`InsertDate\` AS \`Date\`,
    '' AS \`User\`
  FROM 
  (
    SELECT 
      \`s\`.*,
      \`Products\`
    FROM \`Samples\` \`s\`
    INNER JOIN 
    (
      SELECT 
        \`SampleID\`,
        GROUP_CONCAT(\`Naturali_ProdName\` SEPARATOR ', ') AS \`Products\`
      FROM \`Samples_Products\`
      INNER JOIN \`Products\` 
      ON \`Products\`.\`ProdID\` = \`Samples_Products\`.\`ProdID\`
      INNER JOIN \`ProdNames\`
      ON \`ProdNames\`.\`ProdNameID\` = \`Products\`.\`ProdNameID\`
      GROUP BY \`SampleID\`
    ) \`Samples_Products\`
    ON \`Samples_Products\`.\`SampleID\` = \`s\`.\`idSamples\` 
  ) \`Samples\`
  INNER JOIN \`Projects\` \`p\`
  ON \`Samples\`.\`ProjectID\` = \`p\`.\`idProjects\`;
`;

// Deliveries
const dropDeliveriesTable = `
  DROP TABLE IF EXISTS Temp_Deliveries;
`;

const createDeliveriesTable = `
  CREATE TEMPORARY TABLE Temp_Deliveries (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,  
    \`ProjectName\` VARCHAR(255),
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertDeliveriesData = `
  INSERT INTO Temp_Deliveries
  SELECT
    'Delivery' AS \`Type\`,
    \`c\`.\`CustomerID\`,
    \`p\`.\`ProjectName\`,
    CONCAT('Delivery Sent ID: ', \`Deliveries\`.\`DeliveryNumber\`, ' // Quote # -- ', \`SaleID\`) AS \`Description\`,
    \`Delivery_Date\` AS \`Date\`, 
    '' AS \`User\`
  FROM \`Customers\` \`c\`
  LEFT JOIN \`Projects\` \`p\` 
  ON \`c\`.\`CustomerID\` = \`p\`.\`CustomerID\`
  INNER JOIN \`Sales\`
  ON \`Sales\`.\`ProjectID\` = \`p\`.\`idProjects\` 
  INNER JOIN \`Deliveries\`
  ON \`Deliveries\`.\`SaleID\` = \`Sales\`.\`Naturali_Invoice\`;
`;

// Actions
const dropActionsTable = `
  DROP TABLE IF EXISTS Actions;
`;

const createActionsTable = `
  CREATE TEMPORARY TABLE Actions (
    \`Type\` VARCHAR(50),
    \`CustomerID\` INT,
    \`ProjectName\` VARCHAR(255),  
    \`Description\` VARCHAR(255),
    \`Date\` DATETIME,
    \`User\` VARCHAR(255)
  );
`;

const insertActionsData = `
  INSERT INTO Actions
  SELECT
    'Manual Input Action' AS \`Type\`,
    \`c\`.\`CustomerID\`,
    '' AS \`ProjectName\`,
    CONCAT('Action -- ', \`CR\`.\`Comment\`) AS \`Description\`,
    \`CR\`.\`Insert_Date\` AS \`Date\`,
    CONCAT(\`FirstName\`, ' ', \`LastName\`) AS \`User\`
  FROM \`Customers\` \`c\`
  INNER JOIN \`Customer_Relationship\` \`CR\`
  ON \`CR\`.\`CustomerID\` = \`c\`.\`CustomerID\`
  LEFT JOIN \`Seller\` \`s\`
  ON \`s\`.\`SellerID\` = \`CR\`.\`SellerID\`;
`;


async function executeQueries(mysqlConnection) {
  await mysqlConnection.query(dropQuoteCreatedTable);
  await mysqlConnection.query(createQuoteCreatedTable);
  await mysqlConnection.query(insertQuoteCreatedData);
  await mysqlConnection.query(dropQuoteModifiedTable);
  await mysqlConnection.query(createQuoteModifiedTable);
  await mysqlConnection.query(insertQuoteModifiedData);
  await mysqlConnection.query(dropQuoteStatusCanceledTable);
  await mysqlConnection.query(createQuoteStatusCanceledTable);
  await mysqlConnection.query(insertQuoteStatusCanceledData);
  await mysqlConnection.query(dropQuoteStatusUpdatedTable);
  await mysqlConnection.query(createQuoteStatusUpdatedTable);
  await mysqlConnection.query(insertQuoteStatusUpdatedData);
  await mysqlConnection.query(dropTaskCommentsTable);
  await mysqlConnection.query(createTaskCommentsTable);
  await mysqlConnection.query(insertTaskCommentsData);
  await mysqlConnection.query(dropTaskCompletedTable);
  await mysqlConnection.query(createTaskCompletedTable);
  await mysqlConnection.query(insertTaskCompletedData);
  await mysqlConnection.query(dropTaskCreatedTable);
  await mysqlConnection.query(createTaskCreatedTable);
  await mysqlConnection.query(insertTaskCreatedData);
  await mysqlConnection.query(dropPaymentsTable);
  await mysqlConnection.query(createPaymentsTable);
  await mysqlConnection.query(insertPaymentsData);
  await mysqlConnection.query(dropSamplesTable);
  await mysqlConnection.query(createSamplesTable);
  await mysqlConnection.query(insertSamplesData);
  await mysqlConnection.query(dropDeliveriesTable);
  await mysqlConnection.query(createDeliveriesTable);
  await mysqlConnection.query(insertDeliveriesData);
  await mysqlConnection.query(dropActionsTable);
  await mysqlConnection.query(createActionsTable);
  await mysqlConnection.query(insertActionsData);
}

module.exports = {executeQueries}