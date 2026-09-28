import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-body',
  styleUrl: './body.css',
  templateUrl: './body.html',
})
export class Body {
  token: string | null = null;

  router=inject(Router)

  ngOnInit() {
    this.token=localStorage.getItem("token");
    console.log('---'+this.token);
    if (!this.token) {
      this.router.navigate(['login']);
      return;
    }
  }
}
