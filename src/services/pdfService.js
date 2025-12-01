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
                timeout: config.gotenberg.timeout,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        // Verificar se a resposta é válida
        if (!response.data || response.data.length === 0) {
            throw new Error('Resposta vazia do Gotenberg');
        }

        return Buffer.from(response.data);
    } catch (error) {
        // Log detalhado do erro para debug
        console.error('Erro ao converter para PDF:', {
            message: error.message,
            code: error.code,
            response: error.response ? {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data ? error.response.data.toString().substring(0, 200) : null
            } : null,
            request: error.request ? 'Request enviado mas sem resposta' : null
        });

        if (error.response) {
            const errorMsg = error.response.data 
                ? Buffer.from(error.response.data).toString('utf-8').substring(0, 200)
                : error.response.statusText;
            throw new Error(
                `Erro ao converter para PDF: ${error.response.status} - ${errorMsg}`
            );
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            throw new Error(`Timeout ao converter para PDF. O serviço demorou mais de ${config.gotenberg.timeout}ms para responder.`);
        } else if (error.request) {
            throw new Error(`Erro de conexão com o serviço Gotenberg: ${error.message || 'Verifique se o serviço está acessível'}`);
        } else {
            throw new Error(`Erro ao converter para PDF: ${error.message}`);
        }
    }
}

module.exports = {
    convertToPDF
};

