import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    const loginData = { email: this.email, password: this.password };

    this.http.post('http://localhost:3001/api/login', loginData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token); // Guardar el token JWT
        this.router.navigate(['/dashboard']); // Redirigir después del login
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    );
  }
}
