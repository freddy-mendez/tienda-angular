import { Component, inject, signal } from '@angular/core';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-index',
  imports: [CommonModule, MatTableModule, MatIconModule],
  providers: [ProductoServices],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  listadoProductos = signal<Producto[]>([]);
  token: string | null = null;
  router = inject(Router)

  dataSource = new MatTableDataSource<Producto>([]);
  displayedColumns = ['id','nombre','precio','cantidad','acciones'];

  constructor(private productoServices: ProductoServices) { }

  ngOnInit() {
    this.token=localStorage.getItem("token");
    console.log('---'+this.token);
    if (!this.token) {
      this.router.navigate(['login']);
      return;
    }
    this.loaddata();
  }

  loaddata() {
    this.productoServices?.getProductos(this.token).then(productos => {
      console.log("Inicio");
      let respuesta = JSON.parse(productos);
      if (respuesta && respuesta.result === 'OK') {
        this.listadoProductos.set(respuesta.data);
        this.dataSource.data=this.listadoProductos();
        console.log(this.listadoProductos());
      } else {
        console.error('Error al obtener los productos');
      }
    });
  }

  eliminar(id:any) {
    this.productoServices.deleteProducto(id, this.token).then(result => {
      let respuesta = JSON.parse(result);
      if (respuesta && respuesta.result === 'OK') {
        this.loaddata();
      }
    })
  }

}
