import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import { LoginService } from '../../servicios/login-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    })
  });

  error = '';

  onSubmit() {

    console.log('Form submitted:', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } =
      this.loginForm.getRawValue();

    this.loginService.login(email, password)
      .then(response => {

        console.log('Login correcto:', response);

        // Guardar el token recibido por Laravel
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        // Guardar los datos del usuario
        if (response.user) {
          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );
        }

        // Ir a productos después del login
        this.router.navigate(['/productos']);

      })
      .catch(error => {

        console.error('Error de login:', error);

        this.error =
          error.message || 'No fue posible iniciar sesión';

      });
  }
}



