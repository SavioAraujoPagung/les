package com.les.crudusuario.controller;

//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.les.crudusuario.model.Usuario;
import com.les.crudusuario.repository.UsuarioRepository;

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
@RequestMapping("/users")

public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/insert")
    public Usuario saveUser(@RequestBody Usuario user){
        return this.usuarioRepository.save(user);
    }

    @GetMapping("/get/id/{id}")
    public Usuario getUserId(@PathVariable("id") Long id){
        
        Optional<Usuario> userFind = this.usuarioRepository.findById(id);
        if(userFind.isPresent()){
            return userFind.get();
        }
        
        return null; 
    }

    @GetMapping("/get/list")
    public List<Usuario> getListUser(){
        return this.usuarioRepository.findAll();
    }

    @GetMapping("/get/cpf/{cpf}")
    public List<Usuario> getListByCpf(@PathVariable("cpf") String cpf){
        return this.usuarioRepository.findByCpfIgnoreCase(cpf);
    }

    @PutMapping(value="/upd/{id}")
    public ResponseEntity <?> updateUser(@PathVariable("id") long id, @RequestBody Usuario user) {
        return usuarioRepository.findById(id)
           .map(record -> {
               record.setNome(user.getNome());
               record.setCPF(user.getCPF());
               record.setDataCriacao(user.getDataCriacao());
               Usuario updated = usuarioRepository.save(record);
               return ResponseEntity.ok().body(updated);
           }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity <?> deleteUser (@PathVariable("id") Long id){
        return usuarioRepository.findById(id)
           .map(record -> {
                usuarioRepository.deleteById(id);
                return ResponseEntity.ok().build();
           }).orElse(ResponseEntity.notFound().build());
        
    }
    
}