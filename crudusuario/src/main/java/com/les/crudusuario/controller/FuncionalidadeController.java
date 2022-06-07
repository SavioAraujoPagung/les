package com.les.crudusuario.controller;

import java.util.List;
import java.util.Optional;

import com.les.crudusuario.model.Funcionalidade;
import com.les.crudusuario.repository.FuncionalidadeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/func")

public class FuncionalidadeController {

    @Autowired
    private FuncionalidadeRepository funcRepository;

    @PostMapping("/insert")
    public Funcionalidade saveFunc(@RequestBody Funcionalidade func){
        return this.funcRepository.save(func);
    }

    @GetMapping("/get/id/{id}")
    public Funcionalidade getFuncId(@PathVariable("id") Long id){
        
        Optional<Funcionalidade> funcFind = this.funcRepository.findById(id);
        if(funcFind.isPresent()){
            return funcFind.get();
        }
        
        return null; 
    }

    @GetMapping("/get/list")
    public List<Funcionalidade> getListFunc(){
        return this.funcRepository.findAll();
    }

    // @PutMapping(value="/upd/{id}")
    // public ResponseEntity <?> updateFunc(@PathVariable("id") long id, @RequestBody Funcionalidade func) {
    //     return funcRepository.findById(id)
    //        .map(record -> {
    //            record.setNome(func.getNome());
               
    //            Funcionalidade updated = funcRepository.save(record);
    //            return ResponseEntity.ok().body(updated);
    //        }).orElse(ResponseEntity.notFound().build());
    // }

    @DeleteMapping("/del/{id}")
    public ResponseEntity <?> deleteFunc (@PathVariable("id") Long id){
        return funcRepository.findById(id)
           .map(record -> {
            funcRepository.deleteById(id);
                return ResponseEntity.ok().build();
           }).orElse(ResponseEntity.notFound().build());
        
    }
    
}
