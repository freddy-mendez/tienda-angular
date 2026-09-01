export class Producto {
    producto_id: number;
    nombre_producto: string;
    precio_unitario: number;

    constructor(producto_id: number, nombre_producto: string, precio_unitario: number) {
        this.producto_id = producto_id;
        this.nombre_producto = nombre_producto;
        this.precio_unitario = precio_unitario;
    }
}
