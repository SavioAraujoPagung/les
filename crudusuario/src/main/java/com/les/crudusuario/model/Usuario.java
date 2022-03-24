package com.les.crudusuario.model;

//import lombok.AllArgsConstructor;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
//import java.sql.Date;

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
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date datacriacao;
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

	public Date getDataCriacao(){
		return datacriacao;
	}
    public void setDataCriacao(Date datacriacao) {
		this.datacriacao = datacriacao;
	}

}
