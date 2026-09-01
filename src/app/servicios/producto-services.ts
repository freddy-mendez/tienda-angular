import { Service } from '@angular/core';
import { Producto } from '../model/producto';

@Service()
export class ProductoServices {
    apiUrl: string = 'http://10.5.243.156:8000/api/';

    getProductos(): Promise<string> {
        return fetch(this.apiUrl+'producto')
            .then(response => response.text());
    }

    login(email: string, password: string): Promise<string> {
        return fetch(this.apiUrl+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.text());
    }
}
