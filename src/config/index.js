require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY || 'hq7IRdRTgjhejhls3ASovR0QtTsAjq0e',
    gotenberg: {
        url: process.env.GOTENBERG_URL || 'https://testesgotenberg.dev.kmelon.com.br',
        timeout: parseInt(process.env.GOTENBERG_TIMEOUT) || 30000
    },
    templates: {
        basePath: process.env.TEMPLATES_PATH || 'templates',
        detailsPath: 'details',
        relatoriosPath: 'relatorios'
    }
};

