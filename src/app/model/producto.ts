export class Producto {
    producto_id?: number;
    nombre_producto: string;
    descripcion: string;
    precio_unitario: number;
    stock: number;
    iva_porcentaje: number;
    imagen_path?: string;

    constructor(
        producto_id: number | undefined,
        nombre_producto: string,
        descripcion: string,
        precio_unitario: number,
        stock: number,
        iva_porcentaje: number,
        imagen_path: string | undefined
    ) {
        this.producto_id = producto_id;
        this.nombre_producto = nombre_producto;
        this.descripcion = descripcion;
        this.precio_unitario = precio_unitario;
        this.stock = stock;
        this.iva_porcentaje = iva_porcentaje;
        this.imagen_path = imagen_path;
    }


}
