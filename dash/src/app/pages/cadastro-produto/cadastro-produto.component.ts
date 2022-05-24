import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm!: FormGroup;
  categorias: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  categoriaFiltrada!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, 
              private service: ProdutoService,
              public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group(
      {
        nome:['',[Validators.required]],
        categoria:['2',[Validators.required]],
        codigo_barras:['',[Validators.required]],
        rfid:['',[Validators.required]],
        preco_custo:['',[Validators.required]],
        preco_venda:['',[Validators.required]],
        unidade_medida:['unidade',[Validators.required]],
        quantidade:['1',[Validators.required]],
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

  criar() {
    var novoProduto = this.produtoForm.getRawValue() as Produto;
    novoProduto.categoria = Number(novoProduto.categoria)
    debugger
    this.service.criar(novoProduto).subscribe(
      resultado => {
        console.log(resultado)
        this.success("Cadastrado com SUCESSO!")
      },
      err => {
        this.onError("ERRO ao criar produto!")
      }
    );
    this.produtoForm.reset();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  success(successMsg: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: successMsg
    })
  }

}
