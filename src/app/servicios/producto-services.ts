import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoServices {
  apiUrl: string = 'http://10.5.243.245:8000/api/';

  getProductos(token: any): Promise<string> {
    return fetch(this.apiUrl + 'producto', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => response.text());
  }

  deleteProducto(id:any, token:any): Promise<string> {
    return fetch(this.apiUrl + 'producto/'+id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => response.text());
  }
}
