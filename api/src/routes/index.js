const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogsRoutes');
const tempRouter = require('./tempRoutes');
const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use('/dogs', dogsRouter);
mainRouter.use('/temperaments', tempRouter);

module.exports = mainRouter;
