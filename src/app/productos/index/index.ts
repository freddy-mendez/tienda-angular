import { Component } from '@angular/core';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  listadoProductos: Producto[] = [];

  ngOnInit() {
    const productoServices = new ProductoServices();
    productoServices.getProductos().then(productos => {
      //console.log(productos);
      let respuesta = JSON.parse(productos);
      if (respuesta && respuesta.result==='OK') {
        this.listadoProductos = respuesta.data;
        console.log(this.listadoProductos);
      } else {
        console.error('Error al obtener los productos');
      }
    });
  }

}
