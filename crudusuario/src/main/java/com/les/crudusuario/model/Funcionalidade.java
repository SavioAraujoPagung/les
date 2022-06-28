package com.les.crudusuario.model;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="funcionalidades")
public class Funcionalidade {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
        
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
}
