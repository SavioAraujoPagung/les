## Gerencimento de produtos

Api reponsável por gerenciar os produtos.
Porta: ":6666"

#### Rotas
- Inserir:
POST - /produtos?idUsuario=[id_usuario]

```json
{
	"categoria": 2,
	"nome":"queijo",
	"codigo_barras": "111111111111111",
	"rfid": "2222222222222",
	"preco_custo": 25.25,
	"preco_venda": 50.50,
	"unidade_medida": "grama",
	"quantidade": 100
}
```

- Vender:
POST - /produtos/vender?idUsuario=[id_usuario]

```json
{
	"cliente": 2,
	"produtos": [
		{
			"idProduto": 9,
			"quantidade": 2
		},
		{
			"idProduto": 9,
			"quantidade": 2
		}
	]
}	
```

- Buscar por id:
GET - /produtos/[id_produto]?idUsuario=[id_usuario]

**Retorno**
```json
{
	"Id": 1,
	"categoria": 2,
	"codigo_barras": "111111111111111",
	"rfid": "2222222222222",
	"preco_custo": 25.25,
	"preco_venda": 50.5,
	"unidade_medida": "kilos",
	"quantidade": 100
}
```

- Listar: 
GET - /produtos?idUsuario=[id_usuario]&categoria=[id_categoria]

**Retorno**
```json
[
	{
		"Id": 1,
		"categoria": 2,
		"codigo_barras": "111111111111111",
		"rfid": "2222222222222",
		"preco_custo": 25.25,
		"preco_venda": 50.5,
		"unidade_medida": "kilos",
		"quantidade": 100
	}
]
```
