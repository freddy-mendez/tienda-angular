import { Component, signal, inject } from '@angular/core';
import { FormBuilder,  Validators,  ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login-service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  errorMessage = signal('');
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginService = inject(LoginService);
  router = inject(Router);

  private fb = inject(FormBuilder)

  loginForm = this.fb.nonNullable.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]]
  })

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

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
        this.router.navigate(['/producto']);

      })
      .catch(error => {

        console.error('Error de login:', error);

        this.error =
          error.message || 'No fue posible iniciar sesión';

      });
  }
  
  updateErrorMessage() {
    if (this.email?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

}



