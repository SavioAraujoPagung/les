package com.crudusuario.les.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crudusuario.les.model.Usuario;

public interface UsuarioRepository extends JpaRepository <Usuario, Long> {

    @Query("SELECT t FROM Usuario t where t.id > :id")
    public List<Usuario> findAllMoreThen(@Param("id") Long id);

    public List<Usuario> findByCpfIgnoreCase(String cpf);
    
}