package com.les.crudusuario.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.Param;

import com.les.crudusuario.model.Usuario;

public interface UsuarioRepository extends JpaRepository <Usuario, Long> {

    @Query(value ="select  * from usuarios u inner join funcionalidades_usuarios fu on u.id = fu.id_usuario", nativeQuery = true)
    public List<Usuario> findAllUsers();


    @Query("SELECT t FROM Usuario t where t.id > :id")
    public List<Usuario> findAllMoreThen(@Param("id") Long id);

    public List<Usuario> findByCpfIgnoreCase(String cpf);
    
}

