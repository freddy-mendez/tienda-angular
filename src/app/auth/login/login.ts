import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoServices } from '../../servicios/producto-services';

@Component({
  imports: [ReactiveFormsModule],
  providers: [ProductoServices],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(private productoServices: ProductoServices) {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true, validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true, validators: [Validators.required, Validators.minLength(6)]
    })
  });

  error = '';

  onSubmit() { 

    console.log('Form submitted:', this.loginForm.value);
    
    if (this.loginForm.invalid) { 
      this.loginForm.markAllAsTouched(); 
      return 
    } 
    

    const { email, password } = this.loginForm.getRawValue(); 
    this.productoServices.login(email, password).then(response => {
      console.log('Login response:', response);
    });
  }
}




