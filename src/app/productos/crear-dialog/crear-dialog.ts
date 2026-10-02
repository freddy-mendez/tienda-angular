import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  selector: 'app-crear-dialog',
  styleUrl: './crear-dialog.css',
  templateUrl: './crear-dialog.html',
})
export class CrearDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CrearDialog>);

  form = this.fb.nonNullable.group({
    nombre_producto: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(1)]],
    iva_porcentaje: ['', [Validators.required]],
    precio_unitario: [0, [Validators.required, Validators.min(1)]]
  });

  guardar(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
