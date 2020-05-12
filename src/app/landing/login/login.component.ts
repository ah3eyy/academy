import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;

  submitted = false;

  loading = false;

  message;

  constructor(private http: HttpClient, private authService: AuthService, private route: Router, private formbuilder: FormBuilder) { }

  ngOnInit() {

    this.loginUserInit();

  }

  get f() { return this.loginUser.controls; }


  loginUserInit() {

    this.loginUser = this.formbuilder.group({

      email: ['', [Validators.required]],

      password: ['', [Validators.required]]

    });

  }


  onSubmit(credentials: FormGroup) {

    this.loading = true;

    this.submitted = false;

    if (this.loginUser.invalid) {
      this.loading = false;
      return;
    }

    

    this.http.post<any>(`${environment.api_url}auth/login`, credentials.value).subscribe(

      data => {

        if (data.code == 1) {
          this.authService.login(data.accessToken);

          if (this.authService.isAuthenticate()) {

            this.message = { 'type': 'success', 'message': 'Proceeding to dashboard!!!', 'status': true };

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
