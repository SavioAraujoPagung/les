package com.crudusuario.les.controllers;

import com.crudusuario.les.repository.UsuarioRepository;
//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.crudusuario.les.model.Transeunte;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/{id}")
    public Usuario user(@PathVariable("id") Long id){
        
       
        Optional<Usuario> userFind = this.usuarioRepository.findById(id);
        if(userFind.isPresent()){
            return userFind.get();
        }
        
        return null;
        
    }

    @PostMapping("/")
    public Usuario user(@RequestBody Usuario user){
        return this.usuarioRepository.save(user);
    }

    @GetMapping("/list")
    public List<Usuario> lista(){
        return this.usuarioRepository.findAll();
    }


    @GetMapping("/cpf/{cpf}")
    public List<Usuario> listByCpf(@PathVariable("cpf") String cpf){
        return this.usuarioRepository.findByCpfIgnoreCase(cpf);
    }

    @DeleteMapping("/del/{id}")
    public String deleteUsuario (@PathVariable("id") Long id){
        this.usuarioRepository.deleteById(id);
        return "Usuario Excluido!";
        
    }
    
}
