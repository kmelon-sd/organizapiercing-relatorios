# API de Relatórios

API REST para geração de relatórios em PDF a partir de templates Word (.docx).

## Estrutura do Projeto

```
relatorios/
├── src/
│   ├── config/          # Configurações e variáveis de ambiente
│   ├── controllers/     # Controllers das rotas
│   ├── middleware/      # Middlewares (auth, error handling)
│   ├── routes/          # Definição das rotas
│   ├── services/        # Lógica de negócio (template, PDF, relatórios)
│   └── utils/           # Utilitários
├── templates/
│   ├── details/         # Templates de detalhes
│   └── relatorios/      # Templates de relatórios
└── server.js            # Ponto de entrada da aplicação
```

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

## Execução

```bash
npm start
```

## Rotas

### Health Check
```
GET /health
```
Não requer autenticação.

### Detalhes do Cliente
```
GET /details/cliente
Headers:
  x-api-key: <sua-api-key>
Body: JSON com os dados do template
```

### Relatórios
```
GET /relatorios/:tipo
```
Tipos disponíveis: `atendimentos`, `clientes`, `estoque`, `financeiro`

Headers:
  x-api-key: <sua-api-key>
Body: JSON com os dados do template

## Autenticação

Todas as rotas (exceto `/health` e `/api-docs`) requerem autenticação via API Key.

**API Key:** `hq7IRdRTgjhejhls3ASovR0QtTsAjq0e`

### Formas de passar a API Key:

#### Opção 1: Header `x-api-key` (Recomendado)
```
x-api-key: hq7IRdRTgjhejhls3ASovR0QtTsAjq0e
```

#### Opção 2: Header `Authorization` com Bearer
```
Authorization: Bearer hq7IRdRTgjhejhls3ASovR0QtTsAjq0e
```

## Exemplos de Uso

### cURL

**Com x-api-key:**
```bash
curl -X GET http://localhost:3000/details/cliente \
  -H "x-api-key: hq7IRdRTgjhejhls3ASovR0QtTsAjq0e" \
  -H "Content-Type: application/json" \
  -d @src/data.json \
  --output resultado.pdf
```

**Com Authorization Bearer:**
```bash
curl -X GET http://localhost:3000/details/cliente \
  -H "Authorization: Bearer hq7IRdRTgjhejhls3ASovR0QtTsAjq0e" \
  -H "Content-Type: application/json" \
  -d @src/data.json \
  --output resultado.pdf
```

### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/details/cliente', {
  method: 'GET',
  headers: {
    'x-api-key': 'hq7IRdRTgjhejhls3ASovR0QtTsAjq0e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.blob())
.then(blob => {
  // Salvar ou processar o PDF
});
```

### Postman/Insomnia
- **Key:** `x-api-key`
- **Value:** `hq7IRdRTgjhejhls3ASovR0QtTsAjq0e`

Ou:

- **Key:** `Authorization`
- **Value:** `Bearer hq7IRdRTgjhejhls3ASovR0QtTsAjq0e`

## Tecnologias

- Node.js
- Express
- docxtemplater
- Gotenberg (conversão DOCX → PDF)

