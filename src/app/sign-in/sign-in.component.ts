import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const apiUrl = 'https://restapi-omarashrafabdelghafour-omars-projects-67aea2a3.vercel.app/auth/login';

    const payload = {
      email: this.email,
      password: this.password,
    };

    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        if (response.access_token) {
          // Store directly in sessionStorage like original format
          const ttl = 24 * 60 * 60 * 1000; // 24 hours
          const expiryDate = new Date().getTime() + ttl;
          
          // Store token and email as direct values
          sessionStorage.setItem('access_token', response.access_token);
          sessionStorage.setItem('user_email', this.email);
          
          // Store expiration timestamps separately
          sessionStorage.setItem('token_expiry', expiryDate.toString());
          sessionStorage.setItem('email_expiry', expiryDate.toString());

          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }

  // Add this method to check expiration on app initialization
  checkExpiration() {
    const checkKeyExpiry = (key: string, expiryKey: string) => {
      const value = sessionStorage.getItem(key);
      const expiry = sessionStorage.getItem(expiryKey);
      
      if (!value || !expiry) return false;
      if (new Date().getTime() > parseInt(expiry)) {
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(expiryKey);
        return false;
      }
      return true;
    };

    const tokenValid = checkKeyExpiry('access_token', 'token_expiry');
    const emailValid = checkKeyExpiry('user_email', 'email_expiry');
    
    return tokenValid && emailValid;
  }

  // Keep other methods the same
  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  onForgetPassword() {
    alert('Password reset link sent to: ' + this.email);
  }
}