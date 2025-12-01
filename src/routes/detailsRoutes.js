const express = require('express');
const router = express.Router();
const detailsController = require('../controllers/detailsController');

/**
 * @swagger
 * /details/cliente:
 *   get:
 *     summary: Gera PDF de detalhes do cliente
 *     tags: [Details]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteData'
 *           example:
 *             primeironome: "João Silva"
 *             nome: "João Silva"
 *             tag: "VIP"
 *             status: "Ativo"
 *             total_atendimentos: 15
 *             data_ultimoatendimento: "01/12/2025"
 *             ltv: "1.500,00"
 *             ticket: "100,00"
 *             total_indicacoes: 5
 *             ltv_indicacoes: "500,00"
 *             periodo_inicio: "01/11/2025"
 *             periodo_fim: "30/11/2025"
 *             noscao_pct: "participou"
 *             indicador_nome: "Programa Indique e Ganhe"
 *             indicador_data: "Novembro/2025"
 *             atendimento:
 *               - data: "01/12/2025"
 *                 tipo: "Suporte"
 *                 descricao: "Atendimento teste"
 *                 valor: "100,00"
 *                 forma_pgmt: "PIX"
 *             indicacoes:
 *               - client: "Maria Silva"
 *                 data: "20/11/2025"
 *                 atendimentos: 3
 *                 valor_gerado: "300,00"
 *                 ticket_medio: "100,00"
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: API key inválida ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro ao gerar PDF
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/cliente', detailsController.generateClientePDF);

module.exports = router;

