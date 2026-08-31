import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './home/menu/menu';
import { Index } from './productos/index';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Index],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tienda');
}
