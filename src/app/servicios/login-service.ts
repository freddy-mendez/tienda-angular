import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl: string = 'http://10.5.243.156.8000/api/';
    login(email: string, password: string): Promise<any> {
        return fetch(this.apiUrl + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Creedenciales Incorrectas');
            }
            return data;
        });
    }
}