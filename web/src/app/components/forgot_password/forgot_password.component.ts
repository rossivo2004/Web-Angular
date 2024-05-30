import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot_password',
  templateUrl: './forgot_password.component.html',
  styleUrls: ['./forgot_password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.email;
    if (email) {
      this.http.post('http://localhost:3000/users/forgot_password', { email }).subscribe(
        (response: any) => {
          console.log('Email sent successfully:', response);
          // Optionally, display a success message to the user
        },
        (error) => {
          console.error('Error sending email:', error.message);
          // Optionally, display an error message to the user
        }
      );
    } else {
      console.error('Email is required');
    }
  }
}
