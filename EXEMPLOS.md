# Exemplos de Uso da API

## Autenticação

A API aceita a chave de duas formas:

### Forma 1: Header `x-api-key`
```
Key: x-api-key
Value: hq7IRdRTgjhejhls3ASovR0QtTsAjq0e
```

### Forma 2: Header `Authorization` com Bearer
```
Key: Authorization
Value: Bearer hq7IRdRTgjhejhls3ASovR0QtTsAjq0e
```

## Exemplos Práticos

### 1. cURL - Detalhes do Cliente

```bash
curl -X GET http://localhost:3000/details/cliente \
  -H "x-api-key: hq7IRdRTgjhejhls3ASovR0QtTsAjq0e" \
  -H "Content-Type: application/json" \
  -d '{
    "primeironome": "João Silva",
    "nome": "João Silva",
    "tag": "VIP",
    "status": "Ativo",
    "total_atendimentos": 15,
    "atendimento": [
      {
        "data": "01/12/2025",
        "tipo": "Suporte",
        "descricao": "Atendimento teste",
        "valor": "100,00",
        "forma_pgmt": "PIX"
      }
    ]
  }' \
  --output cliente.pdf
```

### 2. cURL - Relatório de Atendimentos

```bash
curl -X GET http://localhost:3000/relatorios/atendimentos \
  -H "x-api-key: hq7IRdRTgjhejhls3ASovR0QtTsAjq0e" \
  -H "Content-Type: application/json" \
  -d '{
    "periodo_inicio": "01/11/2025",
    "periodo_fim": "30/11/2025",
    "dados": []
  }' \
  --output atendimentos.pdf
```

### 3. JavaScript/Node.js (fetch)

```javascript
const data = {
  primeironome: "João Silva",
  nome: "João Silva",
  // ... outros dados
};

const response = await fetch('http://localhost:3000/details/cliente', {
  method: 'GET',
  headers: {
    'x-api-key': 'hq7IRdRTgjhejhls3ASovR0QtTsAjq0e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

if (response.ok) {
  const blob = await response.blob();
  // Salvar o PDF
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cliente.pdf';
  a.click();
} else {
  const error = await response.json();
  console.error('Erro:', error);
}
```

### 4. Axios (Node.js)

```javascript
const axios = require('axios');
const fs = require('fs');

const data = {
  primeironome: "João Silva",
  nome: "João Silva",
  // ... outros dados
};

const response = await axios.get('http://localhost:3000/details/cliente', {
  headers: {
    'x-api-key': 'hq7IRdRTgjhejhls3ASovR0QtTsAjq0e',
    'Content-Type': 'application/json'
  },
  data: data,
  responseType: 'arraybuffer'
});

fs.writeFileSync('cliente.pdf', response.data);
```

### 5. Postman/Insomnia

**Headers:**
- `x-api-key`: `hq7IRdRTgjhejhls3ASovR0QtTsAjq0e`
- `Content-Type`: `application/json`

**Body (raw JSON):**
```json
{
  "primeironome": "João Silva",
  "nome": "João Silva",
  "tag": "VIP",
  "status": "Ativo"
}
```

### 6. Python (requests)

```python
import requests

url = "http://localhost:3000/details/cliente"
headers = {
    "x-api-key": "hq7IRdRTgjhejhls3ASovR0QtTsAjq0e",
    "Content-Type": "application/json"
}
data = {
    "primeironome": "João Silva",
    "nome": "João Silva",
    # ... outros dados
}

response = requests.get(url, headers=headers, json=data)

if response.status_code == 200:
    with open('cliente.pdf', 'wb') as f:
        f.write(response.content)
else:
    print(f"Erro: {response.status_code}")
    print(response.json())
```

## Respostas de Erro

### 401 - API Key Ausente ou Inválida
```json
{
  "error": "API key inválida"
}
```

### 404 - Template Não Encontrado
```json
{
  "error": "Template não encontrado: atendimentos.docx"
}
```

### 500 - Erro ao Gerar PDF
```json
{
  "error": "Erro ao gerar PDF",
  "message": "Descrição do erro"
}
```

