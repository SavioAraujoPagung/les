package com.les.crudusuario.model;


//import lombok.AllArgsConstructor;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//import java.util.List;

//import java.sql.Date;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="telas")
public class Tela {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;

    @ManyToMany
    @JoinTable(name="funcionalidades_telas",
		joinColumns=@JoinColumn(name="id_tela"),
		inverseJoinColumns=@JoinColumn(name="id_funcionalidade")	
	)
    private List<Funcionalidade> funcionalidadeList;
    
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