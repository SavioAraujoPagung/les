package com.les.crudusuario.repository;

//import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

import com.les.crudusuario.model.Funcionalidade;

public interface FuncionalidadeRepository extends JpaRepository <Funcionalidade, Long>{
    
    
}
