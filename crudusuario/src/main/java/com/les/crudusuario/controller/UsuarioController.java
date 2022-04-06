package com.les.crudusuario.controller;

//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.les.crudusuario.model.Usuario;
import com.les.crudusuario.repository.UsuarioRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
//import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/users")

public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/insert")
    public ResponseEntity <?> saveUser(@RequestBody Usuario user, @RequestParam(value = "id_user") String idUser,
    Model model){
        if(usuarioRepository.findPermission(Integer.parseInt(idUser)) > 0){
            Usuario inserted = this.usuarioRepository.save(user);
            return new ResponseEntity<>(inserted, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }  
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> loginUser(@RequestBody Usuario user) {
        Usuario usuario;
        try {
            usuario =  this.usuarioRepository.autenticacaoUsuario(user.getCPF(), user.getSenha());
            if (usuario != null) {
                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        /*if(!usuario.isEmpty()){
            return usuario;
        }
        
        return null;*/
    }

    /*@PostMapping("/login")
    public ResponseEntity <?> loginUser(@RequestBody Usuario user) {
        List<Usuario> users = usuarioRepository.findByCpfIgnoreCase(user.getCPF());
        for (Usuario other : users) {
            if (other.equals(user)) {
                user.setLoggedIn(true);
                usuarioRepository.save(user);
                return new ResponseEntity<>(null, HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }*/

    /*@PostMapping("/logout")
    public ResponseEntity <?> logUserOut(@Validated @RequestBody Usuario user) {
        List<Usuario> users = usuarioRepository.findAll();
        for (Usuario other : users) {
            if (other.equals(user)) {
                user.setLoggedIn(false);
                usuarioRepository.save(user);
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
    }*/
    

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
    public ResponseEntity <?> updateUser(@PathVariable("id") long id, @RequestBody Usuario user, @RequestParam(value = "id_user") String idUser,
    Model model) {
        if(usuarioRepository.findPermission(Integer.parseInt(idUser)) == 0){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
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
    public ResponseEntity <?> deleteUser (@PathVariable("id") Long id, @RequestParam(value = "id_user") String idUser,
    Model model){
        if(usuarioRepository.findPermission(Integer.parseInt(idUser)) == 0){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        if(id == Long.parseLong(idUser)){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return usuarioRepository.findById(id)
           .map(record -> {
                usuarioRepository.deleteById(id);
                return ResponseEntity.ok().build();
           }).orElse(ResponseEntity.notFound().build());
        
    }
    
}
