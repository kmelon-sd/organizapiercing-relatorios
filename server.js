const express = require('express');
const swaggerUi = require('swagger-ui-express');
const config = require('./src/config');
const swaggerSpec = require('./src/config/swagger');
const { authenticateApiKey } = require('./src/middleware/auth');
const { errorHandler } = require('./src/middleware/errorHandler');
const routes = require('./src/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI (sem autenticação)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API de Relatórios - Documentação'
}));

// Health check (sem autenticação)
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check da API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Serviço está funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 service:
 *                   type: string
 *                   example: relatorios-api
 */
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'relatorios-api'
    });
});

// Rotas protegidas
app.use(authenticateApiKey);
app.use('/', routes);

// Tratamento de erros (deve ser o último middleware)
app.use(errorHandler);

// Iniciar servidor
const PORT = config.port;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando em ${HOST}:${PORT}`);
    console.log(`\n📋 Rotas disponíveis:`);
    console.log(`   GET /health (sem autenticação)`);
    console.log(`   GET /api-docs (Swagger UI - sem autenticação)`);
    console.log(`   GET /details/cliente`);
    console.log(`   GET /relatorios/atendimentos`);
    console.log(`   GET /relatorios/clientes`);
    console.log(`   GET /relatorios/estoque`);
    console.log(`   GET /relatorios/financeiro`);
    console.log(`\n🔑 Use o header: x-api-key: ${config.apiKey}`);
    console.log(`📁 Templates em: ${config.templates.basePath}/`);
});

module.exports = app;
