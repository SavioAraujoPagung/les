import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAtivosComponent } from './clientes-ativos.component';

describe('ClintesAtivosComponent', () => {
  let component: ClientesAtivosComponent;
  let fixture: ComponentFixture<ClientesAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesAtivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
