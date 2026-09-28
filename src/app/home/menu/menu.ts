import { Component, inject } from '@angular/core';
import { LoginService } from '../../servicios/login-service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  token: string | null = null;
  loginService = inject(LoginService);

  ngOnInit() {
    //this.token = localStorage.getItem('token');
  }

  logout(event: Event) {
    event.preventDefault();
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loginService.logout(this.token).then((response) => {
        console.log('Respuesta:', response);

        // Guardar el token recibido por Laravel
        if (response.result == 'OK') {
          localStorage.clear();
          window.location.href = 'home';
          return;
        }
      });
    } else {
      alert('No exsite token');
    }
  }
}
