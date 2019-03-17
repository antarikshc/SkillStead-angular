import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    './login.theme.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.authService.hitLogin(form.value.email, form.value.password)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
