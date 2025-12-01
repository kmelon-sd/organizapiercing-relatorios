/**
 * Middleware de tratamento de erros
 */
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';

    console.error('Erro:', {
        status,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });

    res.status(status).json({
        error: message,
        ...(err.allowedTypes && { allowedTypes: err.allowedTypes }),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

module.exports = {
    errorHandler
};

