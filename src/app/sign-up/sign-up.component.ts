import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'https://restapi-omarashrafabdelghafour-omars-projects-67aea2a3.vercel.app/auth/register';

    // Payload to send to the backend
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Send POST request to the backend
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        console.log('Response from backend:', response);

        // Navigate to the home page or a success page after successful registration
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        console.error('Error during registration:', err);
        // You can add user feedback here, like displaying an error message in the UI
      },
    });
  }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
