package com.les.crudusuario.model;

//import lombok.AllArgsConstructor;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
//import java.sql.Date;
import java.util.List;
import java.util.Objects;

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
	private Boolean loggedin;
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date datacriacao;

	@ManyToMany
    @JoinTable(name="funcionalidades_usuarios",
		joinColumns=@JoinColumn(name="id_usuario"),
		inverseJoinColumns=@JoinColumn(name="id_funcionalidade")	
	)
    private List<Funcionalidade> funcionalidadeList;
    //private String email;
    //private String telefone;
    //private Long codRFID;

	

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

	public boolean isLoggedIn() {
        return loggedin;
    }
	public void setLoggedIn(boolean loggedin) {
        this.loggedin = loggedin;
    }

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario)) return false;
        Usuario user = (Usuario) o;
        return Objects.equals(nome, user.nome) && Objects.equals(senha, user.senha);
    }

	


}
