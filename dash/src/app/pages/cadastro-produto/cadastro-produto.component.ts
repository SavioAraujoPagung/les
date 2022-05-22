import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm!:FormGroup;
  categorias: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  categoriaFiltrada!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ProdutoService ) { }

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
    this.categoriaFiltrada = this.produtoForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.categorias.filter(categoria => this._normalizeValue(categoria).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  criar(){
    var novoProduto = this.produtoForm.getRawValue() as Produto;
    //this.service.criar()
    console.log(novoProduto)
  }

}
