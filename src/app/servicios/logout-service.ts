import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogouttService {
    private apiUrl: string = 'http://10.5.243.156:8000/api/';

    logout(): Promise<any> {
        return fetch(this.apiUrl + 'logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const data = await response.json();

        if (!response.ok) {
                throw new Error(data.message || 'Error al cerrar sesión');
            }
            return data;
        });
    }
}