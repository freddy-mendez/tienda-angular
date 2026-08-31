import { Service } from '@angular/core';
import { Producto } from '../model/producto';

@Service()
export class ProductoServices {
    apiUrl: string = 'http://10.5.243.152:8000/api/';

    getProductos(): Promise<string> {
        return fetch(this.apiUrl+'producto')
            .then(response => response.text());
    }
}
