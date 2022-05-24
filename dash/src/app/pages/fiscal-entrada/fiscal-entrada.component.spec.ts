import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalEntradaComponent } from './fiscal-entrada.component';

describe('FiscalEntradaComponent', () => {
  let component: FiscalEntradaComponent;
  let fixture: ComponentFixture<FiscalEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
