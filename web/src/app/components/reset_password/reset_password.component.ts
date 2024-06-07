import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset_password.component.html',
  styleUrls: ['./reset_password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  passwordConfirm: string = '';
  token: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  async resetPassword(): Promise<void> {
    if (this.password !== this.passwordConfirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await this.http.post('http://localhost:3000/users/reset_password', {
        token: this.token,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      }).toPromise();
      alert('Password reset successful');
this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      alert('Error resetting password');
    }
  }
}
