import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exit-veicule',
  templateUrl: './exit-veicule.component.html',
  styleUrls: ['./exit-veicule.component.scss']
})
export class ExitVeiculeComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  get f(): any {
    return this.form.controls;
  }
  ngCreateForm(): void {
    this.form = this.fb.group({
      plate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.ngCreateForm();
  }
  onSubmit(): void {
  }
}

