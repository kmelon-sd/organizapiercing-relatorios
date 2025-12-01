const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

/**
 * @swagger
 * /relatorios/{tipo}:
 *   get:
 *     summary: Gera PDF de relatório
 *     tags: [Relatórios]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *           enum: [atendimentos, clientes, estoque, financeiro]
 *         description: Tipo de relatório a ser gerado
 *         example: atendimentos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/RelatorioAtendimentos'
 *               - type: object
 *                 description: Dados para preencher o template do relatório (estrutura varia por tipo)
 *           examples:
 *             atendimentos:
 *               summary: Exemplo para relatório de atendimentos
 *               value:
 *                 relatorio_titulo: "Relatório de Atendimentos"
 *                 periodo_inicio: "01/12/2024"
 *                 periodo_fim: "31/12/2024"
 *                 indicadores_gerais:
 *                   total_atendimentos: 200
 *                   receita_total: "R$ 45.000,00"
 *                 analise_por_tipo: []
 *                 top_servicos: []
 *                 formas_pagamento: []
 *             outros:
 *               summary: Exemplo genérico
 *               value:
 *                 periodo_inicio: "01/11/2025"
 *                 periodo_fim: "30/11/2025"
 *                 dados: []
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Tipo de relatório inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Tipo de relatório inválido: invalido"
 *               allowedTypes: ["atendimentos", "clientes", "estoque", "financeiro"]
 *       401:
 *         description: API key inválida ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Template não encontrado
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
router.get('/:tipo', relatoriosController.generateRelatorioPDF);

module.exports = router;

