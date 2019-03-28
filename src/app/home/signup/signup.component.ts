import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { CookieService } from 'ngx-cookie-service';

/** Error when invalid control is dirty, touched, or submitted. */
export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
    './signup.theme.scss'
  ]
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  nameFormControl = ['', [
    Validators.required
  ]];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = ['', [
    Validators.required
  ]];
  confirmPasswordFormControl = ['', [
    Validators.required
  ]];
  emailMatcher = new EmailErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NgxNavigationWithDataComponent,
    private cookie: CookieService
    ) {
    this.signUpForm = this.formBuilder.group({
      name: this.nameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.authService.hitSignUp(
        this.signUpForm.value.name,
        this.signUpForm.value.email,
        this.signUpForm.value.password)
        .subscribe(
          (response: { data: { user_id: string} }) => {
            const userId = response.data.user_id;
            this.cookie.set('userId', userId);
            this.navCtrl.navigate('profile');
          },
          (error) => console.log(error)
        );
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
