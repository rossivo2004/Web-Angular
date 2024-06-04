import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersForm = new FormGroup({
      user_name_us: new FormControl('', [Validators.required]),
      password_us: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.usersForm.valid) {
      const { user_name_us, password_us } = this.usersForm.value;
      this.usersService.login(user_name_us, password_us).subscribe({
        next: (response) => {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          if (response.user.role === 1) {
            this.router.navigate(['/admin_products']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.loginError = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }
      });
    } else {
      this.loginError = 'Vui lòng điền đầy đủ thông tin';
    }
  }
}
