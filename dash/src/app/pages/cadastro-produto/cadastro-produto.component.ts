import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/Produto';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm!:FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group(
      {
        nome:['',[Validators.required]],
        categoria:['',[Validators.required]],
        codigo_barras:['',[Validators.required]],
        rfid:['',[Validators.required]],
        preco_custo:['',[Validators.required]],
        preco_venda:['',[Validators.required]],
        unidade_medida:['',[Validators.required]],
        quantidade:['',[Validators.required]],
      }
    );
  }

  criar(){
    
  }

}
