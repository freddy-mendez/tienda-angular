import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
    providedIn: 'root'
})

export class ProductoServices {
    apiUrl: string = 'http://10.5.243.156:8000/api/';

    getProductos(): Promise<string> {
        return fetch(this.apiUrl+'producto')
            .then(response => response.text());
    }
}
