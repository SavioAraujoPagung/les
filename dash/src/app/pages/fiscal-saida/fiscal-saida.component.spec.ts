import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalSaidaComponent } from './fiscal-saida.component';

describe('FiscalSaidaComponent', () => {
  let component: FiscalSaidaComponent;
  let fixture: ComponentFixture<FiscalSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
