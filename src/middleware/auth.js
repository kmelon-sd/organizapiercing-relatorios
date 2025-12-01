const config = require('../config');

/**
 * Middleware de autenticação via API Key
 * Aceita API key no header 'x-api-key' ou 'Authorization: Bearer <key>'
 */
function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'] || 
                   req.headers['authorization']?.replace('Bearer ', '');

    if (!apiKey) {
        return res.status(401).json({ 
            error: 'API key ausente',
            message: 'Forneça uma API key no header x-api-key ou Authorization'
        });
    }

    if (apiKey !== config.apiKey) {
        return res.status(401).json({ 
            error: 'API key inválida'
        });
    }

    next();
}

module.exports = {
    authenticateApiKey
};

