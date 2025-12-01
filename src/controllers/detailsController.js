const reportService = require('../services/reportService');

/**
 * Gera PDF do template de detalhes do cliente
 */
async function generateClientePDF(req, res, next) {
    try {
        const data = req.body || {};

        const pdfBuffer = await reportService.generatePDF('cliente', 'details', data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="cliente.pdf"');
        res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generateClientePDF
};

