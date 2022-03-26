package com.les.crudusuario.model;

//import lombok.AllArgsConstructor;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//import java.sql.Date;
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
    
	@OneToMany(cascade=CascadeType.ALL)
    @JoinTable(name="funcionalidades_usuarios",
		joinColumns={@JoinColumn(name="id_funcionalidade",
		referencedColumnName="id")},
		inverseJoinColumns={@JoinColumn(name="id_usuario",
		referencedColumnName="id")}
	)
    private List<Usuario> usuarioList;
    
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
