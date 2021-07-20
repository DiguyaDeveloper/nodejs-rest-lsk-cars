import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitVeiculeComponent } from './exit-veicule.component';

describe('ExitVeiculeComponent', () => {
  let component: ExitVeiculeComponent;
  let fixture: ComponentFixture<ExitVeiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitVeiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitVeiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
