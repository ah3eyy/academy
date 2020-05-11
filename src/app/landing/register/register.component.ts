import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit() {

    this.registerUserInit();
  }


  registerUserInit() {

    this.registerUser = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      acceptTerms: [true, Validators.requiredTrue]
    });

  }


  get f() { return this.registerUser.controls; }


  onRegisterUser(userInfo: FormGroup) {

    this.loading = true;

    this.submitted = true;

    if (this.registerUser.invalid) {
      this.loading = false;
      return;
    }


    this.http.post<any>(`${environment.api_url}auth/register`, userInfo.value).subscribe(
      data => {

        if (data.code == 1) {

          this.authService.login(data.accessToken);

          if (this.authService.isAuthenticate()) {
            
            this.message = { 'type': 'success', 'message': 'Account created successfully and profile is being setup', 'status': true };

            this.route.navigate(['dashboard']);

            return true;
          }

          this.loading = false;

          this.submitted = false;

          this.message = { 'type': 'error', 'message': 'An error occurred', 'status': true };

        }


        this.loading = false;

        this.submitted = false;

        this.message = { 'type': 'error', 'message': 'An error occurred', 'status': true };

      },
      error => {

        this.loading = false;

        this.submitted = false;

        let message = 'An error occurred';

        if (error.error) {
          message = error.error.short_description
        }

        this.message = { 'type': 'error', 'message': message, 'status': true };

      }
    );

  }


}
