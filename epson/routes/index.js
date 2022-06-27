const { Router } = require('express');
const impressora = require('./impressora_route');
const { json } = require('express/lib/response');

const routes = Router();
routes.use('/impressora/', impressora);

routes.use((error, req, res, next) => {
    let code = error.status || 400
    var menssage;
    if (typeof error == 'string' || error instanceof String)
        message = error
    else
        message = error.error
    return res.status(code).json({ message, stack: error });
});

module.exports = routes;