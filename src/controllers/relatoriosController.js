const reportService = require('../services/reportService');

const TIPOS_PERMITIDOS = ['atendimentos', 'clientes', 'estoque', 'financeiro'];

/**
 * Valida o tipo de relatório
 */
function validateTipo(tipo) {
    if (!TIPOS_PERMITIDOS.includes(tipo)) {
        const error = new Error(`Tipo de relatório inválido: ${tipo}`);
        error.status = 400;
        error.allowedTypes = TIPOS_PERMITIDOS;
        throw error;
    }
}

/**
 * Gera PDF de um relatório
 */
async function generateRelatorioPDF(req, res, next) {
    try {
        const { tipo } = req.params;
        
        validateTipo(tipo);

        if (!reportService.templateExists(tipo, 'relatorios')) {
            const error = new Error(`Template não encontrado: ${tipo}.docx`);
            error.status = 404;
            throw error;
        }

        const data = req.body || {};
        const pdfBuffer = await reportService.generatePDF(tipo, 'relatorios', data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${tipo}.pdf"`);
        res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generateRelatorioPDF
};

