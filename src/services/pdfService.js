const FormData = require('form-data');
const axios = require('axios');
const config = require('../config');

/**
 * Converte um buffer DOCX para PDF usando o serviço Gotenberg
 * @param {Buffer} docxBuffer - Buffer do documento DOCX
 * @returns {Promise<Buffer>} Buffer do PDF gerado
 * @throws {Error} Se houver erro na conversão
 */
async function convertToPDF(docxBuffer) {
    try {
        const form = new FormData();
        form.append('files', docxBuffer, {
            filename: 'document.docx',
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

        const response = await axios.post(
            `${config.gotenberg.url}/forms/libreoffice/convert`,
            form,
            {
                headers: form.getHeaders(),
                responseType: 'arraybuffer',
                timeout: config.gotenberg.timeout
            }
        );

        return Buffer.from(response.data);
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Erro ao converter para PDF: ${error.response.status} - ${error.response.statusText}`
            );
        } else if (error.request) {
            throw new Error('Erro de conexão com o serviço Gotenberg. Verifique se o serviço está acessível.');
        } else {
            throw new Error(`Erro ao converter para PDF: ${error.message}`);
        }
    }
}

module.exports = {
    convertToPDF
};

