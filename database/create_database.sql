create table categorias (
	id serial primary key not null,
	nome varchar(50) UNIQUE not null,
	descricao varchar(50) UNIQUE not null
);

create table clientes (
	id serial primary key not null,
	nome varchar(50) UNIQUE not null,
	cpf varchar(50) UNIQUE not null,
    rfid varchar(50) UNIQUE not null
);

create table vendas (
	id serial primary key not null,
	quantidade int,
	dataCriacao Date
);

create table clientes_vendas (
	id serial primary key not null,
	id_venda int,
	id_cliente int,
	FOREIGN KEY (id_venda) REFERENCES public.vendas(id),
	FOREIGN KEY (id_cliente) REFERENCES public.clientes(id)
);

create table produtos (
	id serial primary key not null,
	id_categoria int,
	codigo_barra varchar(50),
	rfid varchar(50),
	precoCusto decimal,
	precoVenda decimal,
	unidadeMedida varchar (20),
	quantidade int,
	FOREIGN KEY (id_categoria) REFERENCES public.categorias (id)
);

create table produtos_vendas (
	id serial primary key not null,
	id_produto int,
	id_venda int,
	quantidade_item decimal,
	preco decimal,
	FOREIGN KEY (id_produto) REFERENCES public.produtos (id),
	FOREIGN KEY (id_venda) REFERENCES public.vendas (id)
);

create table funcionalidades (
	id serial primary key not null,
	nome varchar (50)
);

create table usuarios (
	id serial primary key not null,
	nome varchar (50),
	cpf varchar (50),
	biometria varchar (250),
	dataCriacao Date
);

create table funcionalidades_usuarios (
	id_funcionalidade int,
	id_usuario int,
	FOREIGN KEY (id_funcionalidade) REFERENCES public.funcionalidades (id),
	FOREIGN KEY (id_usuario) REFERENCES public.usuarios (id)
)




