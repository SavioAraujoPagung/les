import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVendarCafeteriaComponent } from './dialog-vendar-cafeteria.component';

describe('DialogVendarCafeteriaComponent', () => {
  let component: DialogVendarCafeteriaComponent;
  let fixture: ComponentFixture<DialogVendarCafeteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVendarCafeteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVendarCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
