import { Component, signal } from '@angular/core';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  providers: [ProductoServices],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  listadoProductos = signal<Producto[]>([]);

  constructor(private productoServices: ProductoServices) { }

  ngOnInit() {

    this.loaddata();
  }

  loaddata() {
    this.productoServices?.getProductos().then(productos => {
      console.log("Inicio");
      let respuesta = JSON.parse(productos);
      if (respuesta && respuesta.result === 'OK') {
        this.listadoProductos.set(respuesta.data);
        console.log(this.listadoProductos());
      } else {
        console.error('Error al obtener los productos');
      }
    });
  }

}
