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

  getProducto(id: any, token: any): Promise<any> {
    return fetch(`${this.apiUrl}producto/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => response.json());
  }

  addProducto(producto: any, token: any): Promise<any> {
    return fetch(`${this.apiUrl}producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(producto), // Convertir el objeto JS a una cadena JSON
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo crear el producto');
      }
      return data;
    });
  }

  editProducto(id: any, producto: any, token: any): Promise<any> {
    return fetch(`${this.apiUrl}producto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(producto), // Convertir el objeto JS a una cadena JSON
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo actualizar el producto');
      }
      return data;
    });
  }

  deleteProducto(id: any, token: any): Promise<string> {
    return fetch(this.apiUrl + 'producto/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => response.text());
  }
}
