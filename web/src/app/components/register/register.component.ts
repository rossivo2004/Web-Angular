import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users!: Users[];
  usersForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersForm = new FormGroup({
     user_name_us: new FormControl('', [Validators.required, Validators.minLength(8)]),
     email_us: new FormControl('', [Validators.required, Validators.email]),
     password_us: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;':",.<>?])[a-zA-Z0-9!@#$%^&*()_+[\]{}|;':",.<>?]{8,}$/)])
    });

    document.addEventListener('DOMContentLoaded', this.form_register);
  }

  form_register() {
    const register = document.querySelector('.form_register');

    if (!register) {
      console.error("Register form not found");
      return;
    }

    register.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const username = (document.querySelector('.register_username') as HTMLInputElement).value.trim();
      const email = (document.querySelector('.register_email') as HTMLInputElement).value.trim();
      const password = (document.querySelector('.register_password') as HTMLInputElement).value.trim();

      const username_error = document.querySelector('.rg_username__error');
      const email_error = document.querySelector('.rg_email__error');
      const password_error = document.querySelector('.rg_password__error');

      if (!username_error || !email_error || !password_error) {
        console.error("Error message elements not found");
        return;
      }

      username_error.textContent = '';
      email_error.textContent = '';
      password_error.textContent = '';

      if (username === '') {
        username_error.textContent = 'Tên đăng nhập không được để trống';
      } else if (username.length < 8) {
        username_error.textContent = 'Tên đăng nhập tối thiểu 8 kí tự';
      } else {
        username_error.textContent = '';
      }

      if (email === '') {
        email_error.textContent = 'Email không được để trống';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        email_error.textContent = 'Định dạng email không hợp lệ';
      } else {
        email_error.textContent = '';
      }

      if (password === '') {
        password_error.textContent = 'Mật khẩu không được để trống';
      } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;':",.<>?])[a-zA-Z0-9!@#$%^&*()_+[\]{}|;':",.<>?]{8,}$/.test(password)) {
        password_error.textContent = 'Mật khẩu không hợp lệ';
      } else if (password.length < 8) {
        password_error.textContent = 'Mật khẩu tối thiểu 8 kí tự';
      } else {
        password_error.textContent = '';
      }
    });
  }

  onSubmit() {
    if (this.usersForm.valid) {
      const userData = this.usersForm.value;
      this.userService.addUser(userData).subscribe((data) => {
        alert('Đăng kí thành công');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Lỗi');
        // this.router.navigate(['/login']);
      });
    }
  }
}
