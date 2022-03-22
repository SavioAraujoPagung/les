package com.crudusuario.les.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Usuario {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
	private String cpf;
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

   /* public String getEmail() {
		return email;
	}
    public void setEmail(String email) {
		this.email = email;
	}

    public String getTelefone() {
		return telefone;
	}
    public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

    public Long getCodRFID() {
		return codRFID;
	}
    public void setCodRFID(Long codRFID) {
		this.codRFID = codRFID;
	}*/

    


}
