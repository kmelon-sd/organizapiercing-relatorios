const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');

/**
 * Prepara os dados para o template
 * Aceita variações de nomes de campos e garante arrays
 */
function prepareTemplateData(dataRaw) {
    return {
        periodo_inicio: dataRaw.periodo_inicio || dataRaw.periodoinicio || '',
        periodo_fim: dataRaw.periodo_fim || dataRaw.periodofim || '',
        atendimento: Array.isArray(dataRaw.atendimento) ? dataRaw.atendimento : [],
        indicacoes: Array.isArray(dataRaw.indicacoes) ? dataRaw.indicacoes : [],
        ...dataRaw
    };
}

/**
 * Gera um documento DOCX a partir de um template e dados
 * @param {string} templatePath - Caminho para o arquivo template .docx
 * @param {object} data - Dados para preencher o template
 * @returns {Buffer} Buffer do documento DOCX gerado
 * @throws {Error} Se o template não for encontrado ou houver erro no processamento
 */
function generateDocx(templatePath, data) {
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template não encontrado: ${templatePath}`);
    }

    try {
        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(content);
        
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const templateData = prepareTemplateData(data);
        doc.render(templateData);

        const buffer = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });

        return buffer;
    } catch (error) {
        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
                .map(e => `${e.name}: ${e.message}`)
                .join('; ');
            throw new Error(`Erro ao processar template: ${errorMessages}`);
        }
        throw error;
    }
}

module.exports = {
    generateDocx,
    prepareTemplateData
};

