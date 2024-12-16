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
    const apiUrl = 'http://localhost:5000/auth/login';

    // Payload for login
    const payload = {
      email: this.email,
      password: this.password,
    };

    // Send POST request to login endpoint
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        console.log('Response from backend:', response);

        // Check if response contains access token
        if (response.access_token) {
          // Store the access token and email in localStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_email', this.email);
          console.log('Access Token saved:', response.access_token);
          console.log('Email saved:', this.email);

          // Redirect to the home page
          this.router.navigate(['/home']);
        } else {
          console.error('No token found in response');
        }
      },
      error: (err) => {
        console.error('Error during login:', err);
      }
    });
  }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  onForgetPassword() {
    console.log('Forget Password clicked for email:', this.email);
    // Logic for handling forgot password
    alert('A password reset link has been sent to your email: ' + this.email);
  }
}
