const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

// Caminhos dos arquivos
const baseDir = __dirname;
const templatePath = path.join(baseDir, 'src', 'template.docx');
const dataPath = path.join(baseDir, 'src', 'data.json');
const outputDir = path.join(baseDir, 'results');

// Criar pasta results se não existir
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Ler os dados do JSON
const dataRaw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Preparar os dados para o template
const templateData = {
    primeironome: dataRaw.primeironome || '',
    nome: dataRaw.nome || '',
    tag: dataRaw.tag || '',
    status: dataRaw.status || '',
    total_atendimentos: dataRaw.total_atendimentos || 0,
    data_ultimoatendimento: dataRaw.data_ultimoatendimento || '',
    ltv: dataRaw.ltv || '0,00',
    ticket: dataRaw.ticket || '0,00',
    total_indicacoes: dataRaw.total_indicacoes || 0,
    ltv_indicacoes: dataRaw.ltv_indicacoes || '0,00',
    periodo_inicio: dataRaw.periodo_inicio || '',
    periodo_fim: dataRaw.periodo_fim || '',
    noscao_pct: dataRaw.noscao_pct || '',
    indicador_nome: dataRaw.indicador_nome || 'Relatório',
    indicador_data: dataRaw.indicador_data || '',
    atendimento: dataRaw.atendimento || [],
    indicacoes: dataRaw.indicacoes || []
};

// Função para converter DOCX para PDF usando Gotenberg
async function convertToPDF(docxPath) {
    const gotenbergUrl = 'https://testesgotenberg.dev.kmelon.com.br';
    
    try {
        // Criar form-data com o arquivo
        const form = new FormData();
        form.append('files', fs.createReadStream(docxPath));

        // Fazer requisição para o Gotenberg
        const response = await axios.post(
            `${gotenbergUrl}/forms/libreoffice/convert`,
            form,
            {
                headers: form.getHeaders(),
                responseType: 'arraybuffer',
                timeout: 30000 // 30 segundos de timeout
            }
        );

        // Salvar o PDF
        const pdfPath = path.join(outputDir, 'resultado.pdf');
        fs.writeFileSync(pdfPath, response.data);

        console.log('✅ PDF gerado com sucesso!');
        console.log(`📄 Arquivo salvo em: ${pdfPath}`);
    } catch (error) {
        console.error('❌ Erro ao converter para PDF:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Mensagem: ${error.response.statusText}`);
        } else if (error.request) {
            console.error('Erro de conexão com o Gotenberg');
            console.error('Verifique se o serviço está acessível');
        } else {
            console.error(error.message);
        }
        throw error;
    }
}

// Função principal
async function main() {
    try {
        // Ler o template
        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Renderizar o documento com os dados
        doc.render(templateData);

        // Gerar o buffer do documento
        const buf = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });

        // Salvar o resultado
        const outputPath = path.join(outputDir, 'resultado.docx');
        fs.writeFileSync(outputPath, buf);

        console.log('✅ Relatório DOCX gerado com sucesso!');
        console.log(`📄 Arquivo salvo em: ${outputPath}`);

        // Converter para PDF usando Gotenberg
        console.log('\n🔄 Convertendo para PDF...');
        await convertToPDF(outputPath);
    } catch (error) {
        // Tratamento de erros do docxtemplater
        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(e => {
                return `❌ ${e.name}: ${e.message}`;
            }).join('\n');
            console.error('Erros no template:');
            console.error(errorMessages);
            console.error('\n💡 Dicas para corrigir:');
            console.error('1. Verifique se as tags de loop estão completas: {#atendimento} ... {/atendimento}');
            console.error('2. No docxtemplater, loops em tabelas devem ter:');
            console.error('   - Tag de abertura {#atendimento} na primeira célula da linha');
            console.error('   - Tag de fechamento {/atendimento} na última célula da MESMA linha');
            console.error('   - Variáveis {data}, {tipo}, etc. nas células entre elas');
        } else {
            console.error('❌ Erro:', error.message);
            console.error(error);
        }
        process.exit(1);
    }
}

// Executar função principal
main();

