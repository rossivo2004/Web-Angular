import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my_account.component.html',
  styleUrls: ['./my_account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: Users | null = null;
  userFormUpdate: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private http: HttpClient
  ) {
    this.userFormUpdate = new FormGroup({
      name_us: new FormControl('', Validators.required),
      user_name_us: new FormControl('', Validators.required),
      email_us: new FormControl('', [Validators.required, Validators.email]),
      phone_us: new FormControl('', Validators.required),
      address_us: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const dataUser = localStorage.getItem('currentUser');
    if (dataUser) {
      try {
        const user = JSON.parse(dataUser);
        const id = user._id;
        this.usersService.getUserById(id).subscribe(
          (data: Users) => {
            this.user = data;
            this.userFormUpdate.patchValue({
              name_us: data.name_us,
              user_name_us: data.user_name_us,
              email_us: data.email_us,
              phone_us: data.phone_us,
              address_us: data.address_us
            });
          },
          (error) => {
            console.error('Error fetching user data', error);
          }
        );
      } catch (error) {
        console.error('Error parsing user data', error);
      }
    }
  }

  onSubmit() {
    if (this.user) {
      this.usersService.updateUser(this.user._id, this.userFormUpdate.value)
        .subscribe({
          next: (data) => {
            alert('Cập nhật thông tin thành công');
          },
          error: (error) => {
            console.error('Lỗi:', error);
          },
        });
    }
  }
}
