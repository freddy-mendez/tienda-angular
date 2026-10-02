import { Component, inject, signal } from '@angular/core';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CrearDialog } from '../crear-dialog/crear-dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  providers: [ProductoServices],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  listadoProductos = signal<Producto[]>([]);
  token: string | null = null;
  router = inject(Router);

  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  horizontalPosition = signal<MatSnackBarHorizontalPosition>('center');
  verticalPosition = signal<MatSnackBarVerticalPosition>('top');

  dataSource = new MatTableDataSource<Producto>([]);
  displayedColumns = ['id', 'nombre', 'precio', 'cantidad', 'acciones'];

  constructor(private productoServices: ProductoServices) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    console.log('---' + this.token);
    if (!this.token) {
      this.router.navigate(['login']);
      return;
    }
    this.loaddata();
  }

  loaddata() {
    this.productoServices?.getProductos(this.token).then((productos) => {
      console.log('Inicio');
      let respuesta = JSON.parse(productos);
      if (respuesta && respuesta.result === 'OK') {
        this.listadoProductos.set(respuesta.data);
        this.dataSource.data = this.listadoProductos();
        console.log(this.listadoProductos());
      } else {
        console.error('Error al obtener los productos');
      }
    });
  }

  eliminar(id: any) {
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: 'No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoServices.deleteProducto(id, this.token).then((result) => {
          let respuesta = JSON.parse(result);
          if (respuesta && respuesta.result === 'OK') {
            Swal.fire({
              title: 'Eliminado!',
              text: 'El producto ha sido eliminado.',
              icon: 'success',
            });
            this.loaddata();
          }
        });
      }
    });
  }

  abrirCrear() {
    const dialogRef = this.dialog.open(CrearDialog, {
      width: '450px',
      height: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((producto: Producto | undefined) => {
      if (producto !== undefined) {
        this.productoServices.addProducto(producto, this.token).then((result) => {
          let respuesta = result;
          if (respuesta && respuesta.result === 'OK') {
            this._snackBar.open('Producto creado exitosamente', 'Cerrar', {
              horizontalPosition: this.horizontalPosition(),
              verticalPosition: this.verticalPosition(),
            });
            this.loaddata();
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'No se pudo crear el producto.',
              icon: 'error',
            });
          }
        });
        console.log('Producto creado:', producto);
      }
    });
  }
}
