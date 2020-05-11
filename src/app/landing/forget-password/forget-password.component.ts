import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPassword: FormGroup;

  loading;

  submitted;

  message;

  constructor(private formbuilder: FormBuilder, private route: Router, private http: HttpClient) { }

  ngOnInit() {

    this.forgotPasswordInit();

  }


  forgotPasswordInit() {

    this.forgotPassword = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get f() { return this.forgotPassword.controls; }


  onForgotPassword(info: FormGroup) {

    this.loading = true;

    this.submitted = true;

    if (this.forgotPassword.invalid) {
      this.loading = false;
      return;
    }


    this.http.post<any>(`${environment.api_url}auth/forgot-password`, info.value).subscribe(

      data => {

        if (data.code == 1) {

          this.loading = false;

          this.submitted = false;

          this.message = { 'type': 'success', 'message': 'Reset e-mail has being sent to the provided email address.', 'status': true };

          return true;
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
