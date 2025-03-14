import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';  // Cambia esta URL a tu API de autenticación

  constructor(private http: HttpClient, private router: Router) { }

  // Método de login para obtener el JWT
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Almacenar el token JWT en el almacenamiento local
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtener el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Si no hay token o el token ha expirado
    if (!token) {
      return false;
    }
    // Puedes agregar lógica aquí para verificar si el token sigue siendo válido
    return true;
  }

  // Método de logout para eliminar el token
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Método para agregar el token a las solicitudes HTTP
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Método para obtener la información del usuario
  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { headers: this.getHeaders() });
  }
}
