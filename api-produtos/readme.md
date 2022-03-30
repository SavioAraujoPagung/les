## Gerencimento de produtos

Api reponsável por gerenciar os produtos

#### Rotas
- Inserir
POST - /produtos

```json
{
	"categoria": 2,
	"codigo_barras": "111111111111111",
	"rfid": "2222222222222",
	"preco_custo": 25.25,
	"preco_venda": 50.50,
	"unidade_medida": "kilos",
	"quantidade": 100
}
```