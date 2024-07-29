// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin123') {
      localStorage.setItem('authToken', 'your-auth-token');
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.loginError = 'Invalid username or password';
    }
  }
}
