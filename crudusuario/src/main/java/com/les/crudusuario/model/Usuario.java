package com.les.crudusuario.model;

//import lombok.AllArgsConstructor;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
//import java.sql.Date;
import java.util.List;


import javax.persistence.*;


@Getter
@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Entity
@Table(name="usuarios")
public class Usuario {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
	private String cpf;
	private String senha;
	@Basic
	@Temporal(TemporalType.DATE)
	private Date datacriacao;

	@ManyToMany
    @JoinTable(name="funcionalidade_usuarios",
		joinColumns=@JoinColumn(name="id_usuario"),
		inverseJoinColumns=@JoinColumn(name="id_funcionalidade")	
	)

  private List<Funcionalidade> funcionalidadeList;

	public List<Funcionalidade> getfuncionalidadeList(){
		return this.funcionalidadeList;
	}

    public Long getId() {
		return id;
	}
	public void setIdT(Long id) {
		this.id = id;
	}

    public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

    public String getCPF() {
		return cpf;
	}
    public void setCPF(String cpf) {
		this.cpf = cpf;
	}

	public String getSenha() {
		return senha;
	}
    public void setSenha(String senha) {
		this.senha = senha;
	}

	public Date getDataCriacao(){
		return datacriacao;
	}
    public void setDataCriacao(Date datacriacao) {
		this.datacriacao = datacriacao;
	}
	
}
