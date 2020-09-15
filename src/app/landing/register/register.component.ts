import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;

  submitted = false;

  message;

  loading = false;

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private authService: AuthService, private route: Router) {
  }

  ngOnInit() {

    this.registerUserInit();
  }


  registerUserInit() {

    this.registerUser = this.formbuilder.group({
      full_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      acceptTerms: [true, Validators.requiredTrue]
    });

  }


  get f() {
    return this.registerUser.controls;
  }


  onRegisterUser(userInfo: FormGroup) {

    this.loading = true;

    if (this.registerUser.invalid) {
      this.loading = false;
      return;
    }

    this.authService.userRegister(this.registerUser.value).subscribe(
      (response: any) => {

        this.authService.login(response.data.access_token);

        this.authService.saveUser(response.data.user);

        this.message = {
          'type': 'success',
          'message': 'Account created successfully',
          'status': true
        };

        this.route.navigate(['/']);

      },
      error => {

        this.loading = false;

        let message = 'An error occurred creating account';

        if (error.error) {
          message = error.error.message;
        }

        this.message = {'type': 'error', 'message': message, 'status': true};

      }
    );

  }


}
