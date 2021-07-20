import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVeiculeComponent } from './register-veicule.component';

describe('RegisterVeiculeComponent', () => {
  let component: RegisterVeiculeComponent;
  let fixture: ComponentFixture<RegisterVeiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVeiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVeiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
