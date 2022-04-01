package com.les.crudusuario.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.Param;

import com.les.crudusuario.model.Usuario;

public interface UsuarioRepository extends JpaRepository <Usuario, Long > {

    @Query(value ="SELECT count(*) FROM funcionalidades_usuarios WHERE id_usuario=:id and id_funcionalidade=1", nativeQuery = true)
    //public Boolean findPermission(@Param("id") Integer id);
    public Long findPermission(@Param("id") Integer id);


    @Query("SELECT t FROM Usuario t where t.id > :id")
    public List<Usuario> findAllMoreThen(@Param("id") Long id);

    public List<Usuario> findByCpfIgnoreCase(String cpf);

    @Query(value ="SELECT * FROM usuarios WHERE cpf=:cpf and senha=:senha",nativeQuery = true)
    public List<Usuario> autenticacaoUsuario(@Param("cpf") String cpf, @Param("senha") String senha);
    
}

