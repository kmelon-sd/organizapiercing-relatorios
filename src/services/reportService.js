const path = require('path');
const fs = require('fs');
const templateService = require('./templateService');
const pdfService = require('./pdfService');
const config = require('../config');

/**
 * Gera um PDF a partir de um template e dados
 * @param {string} templateName - Nome do template (sem extensão)
 * @param {string} category - Categoria do template ('details' ou 'relatorios')
 * @param {object} data - Dados para preencher o template
 * @returns {Promise<Buffer>} Buffer do PDF gerado
 */
async function generatePDF(templateName, category, data) {
    const templatePath = path.join(
        __dirname,
        '..',
        '..',
        config.templates.basePath,
        category === 'details' ? config.templates.detailsPath : config.templates.relatoriosPath,
        `${templateName}.docx`
    );

    // Gerar DOCX
    const docxBuffer = templateService.generateDocx(templatePath, data);

    // Converter para PDF
    const pdfBuffer = await pdfService.convertToPDF(docxBuffer);

    return pdfBuffer;
}

/**
 * Verifica se um template existe
 * @param {string} templateName - Nome do template
 * @param {string} category - Categoria do template
 * @returns {boolean}
 */
function templateExists(templateName, category) {
    const templatePath = path.join(
        __dirname,
        '..',
        '..',
        config.templates.basePath,
        category === 'details' ? config.templates.detailsPath : config.templates.relatoriosPath,
        `${templateName}.docx`
    );
    
    return fs.existsSync(templatePath);
}

module.exports = {
    generatePDF,
    templateExists
};

