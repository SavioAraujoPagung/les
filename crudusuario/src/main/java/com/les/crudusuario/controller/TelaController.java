package com.les.crudusuario.controller;

import java.util.List;
import java.util.Optional;

import com.les.crudusuario.model.Tela;
import com.les.crudusuario.repository.TelaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/telas")

public class TelaController {

    @Autowired
    private TelaRepository telaRepository;

    @PostMapping("/insert")
    public Tela saveFunc(@RequestBody Tela func){
        return this.telaRepository.save(func);
    }

    @GetMapping("/get/id/{id}")
    public Tela getFuncId(@PathVariable("id") Long id){
        
        Optional<Tela> funcFind = this.telaRepository.findById(id);
        if(funcFind.isPresent()){
            return funcFind.get();
        }
        
        return null; 
    }

    @GetMapping("/get/list")
    public List<Tela> getListFunc(){
        return this.telaRepository.findAll();
    }

    /*
    @PutMapping(value="/upd/{id}")
    public ResponseEntity <?> updateFunc(@PathVariable("id") long id, @RequestBody Tela func) {
        return telaRepository.findById(id)
           .map(record -> {
               record.setNome(func.getNome());
               
               Tela updated = telaRepository.save(record);
               return ResponseEntity.ok().body(updated);
           }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity <?> deleteFunc (@PathVariable("id") Long id){
        return telaRepository.findById(id)
           .map(record -> {
            telaRepository.deleteById(id);
                return ResponseEntity.ok().build();
           }).orElse(ResponseEntity.notFound().build());
        
    }*/
}