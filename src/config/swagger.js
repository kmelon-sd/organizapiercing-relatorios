const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Relatórios',
            version: '1.0.0',
            description: 'API REST para geração de relatórios em PDF a partir de templates Word (.docx)',
            contact: {
                name: 'Suporte API',
            },
        },
        servers: [
            {
                url: 'https://relatoriosop.dev.kmelon.com.br',
                description: 'Servidor de produção',
            },
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'API Key para autenticação',
                },
            },
            schemas: {
                ClienteData: {
                    type: 'object',
                    properties: {
                        primeironome: { type: 'string', example: 'João Silva' },
                        nome: { type: 'string', example: 'João Silva' },
                        tag: { type: 'string', example: 'VIP' },
                        status: { type: 'string', example: 'Ativo' },
                        total_atendimentos: { type: 'number', example: 15 },
                        data_ultimoatendimento: { type: 'string', example: '01/12/2025' },
                        ltv: { type: 'string', example: '1.500,00' },
                        ticket: { type: 'string', example: '100,00' },
                        total_indicacoes: { type: 'number', example: 5 },
                        ltv_indicacoes: { type: 'string', example: '500,00' },
                        periodo_inicio: { type: 'string', example: '01/11/2025' },
                        periodo_fim: { type: 'string', example: '30/11/2025' },
                        noscao_pct: { type: 'string', example: 'participou' },
                        indicador_nome: { type: 'string', example: 'Programa Indique e Ganhe' },
                        indicador_data: { type: 'string', example: 'Novembro/2025' },
                        atendimento: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    data: { type: 'string', example: '01/12/2025' },
                                    tipo: { type: 'string', example: 'Suporte' },
                                    descricao: { type: 'string', example: 'Atendimento teste' },
                                    valor: { type: 'string', example: '100,00' },
                                    forma_pgmt: { type: 'string', example: 'PIX' },
                                },
                            },
                        },
                        indicacoes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    client: { type: 'string', example: 'Maria Silva' },
                                    data: { type: 'string', example: '20/11/2025' },
                                    atendimentos: { type: 'number', example: 3 },
                                    valor_gerado: { type: 'string', example: '300,00' },
                                    ticket_medio: { type: 'string', example: '100,00' },
                                },
                            },
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Mensagem de erro' },
                        message: { type: 'string', example: 'Descrição detalhada do erro' },
                    },
                },
                RelatorioAtendimentos: {
                    type: 'object',
                    properties: {
                        periodo_inicio: { type: 'string', example: '01/12/2024' },
                        periodo_fim: { type: 'string', example: '31/12/2024' },
                        ticket_medio: { type: 'string', example: 'R$ 300,00' },
                        total_atendimentos: { type: 'number', example: 200 },
                        receita_total: { type: 'string', example: 'R$ 45.000,00' },
                        clientes_unicos: { type: 'number', example: 86 },
                        novos_clientes: { type: 'number', example: 12 },
                        atendimentos_por_dia: { type: 'number', example: 6 },
                        custos_com_clientes: { type: 'string', example: 'R$ 22.500' },
                        lucro_com_atendimentos: { type: 'string', example: '66,5%' },
                        destaque_melhor_dia: { type: 'string', example: 'sabado' },
                        destaque_melhor_dia_qtd: { type: 'string', example: '12' },
                        lucro_total: { type: 'string', example: 'R$ 26.550,00' },
                        margem_media: { type: 'string', example: '59,0%' },
                        analise_por_tipo: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    tipo: { type: 'string', example: 'Serviços diversos' },
                                    qtd: { type: 'number', example: 100 },
                                    valor: { type: 'string', example: 'R$ 30.000' },
                                    lucro: { type: 'string', example: 'R$ 18.000' },
                                    percentual: { type: 'string', example: '66,7%' },
                                    ticket_med: { type: 'string', example: 'R$ 300' }
                                }
                            }
                        },
                        top_servicos: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    nome: { type: 'string' },
                                    qtd: { type: 'number' },
                                    valor: { type: 'string' },
                                    ticket_med: { type: 'string' }
                                }
                            }
                        },
                        top_perfuracoes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    nome: { type: 'string' },
                                    qtd: { type: 'number' },
                                    valor: { type: 'string' },
                                    ticket_med: { type: 'string' }
                                }
                            }
                        },
                        top_joias: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    nome: { type: 'string' },
                                    qtd: { type: 'number' },
                                    valor: { type: 'string' },
                                    ticket_med: { type: 'string' }
                                }
                            }
                        },
                        analise_dias_semana: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    dia: { type: 'string', example: 'Segunda-Feira' },
                                    atendimentos: { type: 'number' },
                                    receita: { type: 'string' },
                                    percentual: { type: 'string' },
                                    ticket_med: { type: 'string' }
                                }
                            }
                        },
                        formas_pagamento: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    forma: { type: 'string', example: 'Pix' },
                                    qtd: { type: 'number' },
                                    valor: { type: 'string' },
                                    ticket_med: { type: 'string' }
                                }
                            }
                        },
                        analise_lucratividade: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    tipo: { type: 'string' },
                                    receita: { type: 'string' },
                                    custos: { type: 'string' },
                                    lucro: { type: 'string' }
                                }
                            }
                        }
                    }
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

