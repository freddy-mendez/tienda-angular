import { Component, inject, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';

@Component({
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  selector: 'app-editar-dialog',
  styleUrl: './editar-dialog.css',
  templateUrl: './editar-dialog.html',
})
export class EditarDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditarDialog>);

  form = this.fb.nonNullable.group({
    nombre_producto: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(1)]],
    iva_porcentaje: ['', [Validators.required]],
    precio_unitario: [0, [Validators.required, Validators.min(1)]],
  });

  productoService = inject(ProductoServices);
  private producto: Producto | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public id: Number) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (this.id) {
      this.productoService.getProducto(this.id, token).then(result => {
        if (result.result=='OK') {
          this.producto=result.data;
          console.log(result.data, String(this.producto?.iva_porcentaje));
          this.form.patchValue({...this.producto,
        iva_porcentaje: String(this.producto?.iva_porcentaje)});
        }
      });
    }
  }

  guardar(): void {
    if (this.form.valid) {
      // Cierra el modal y retorna los datos del formulario
      this.dialogRef.close({ ...this.form.getRawValue(), producto_id: this.producto?.producto_id });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }


}
