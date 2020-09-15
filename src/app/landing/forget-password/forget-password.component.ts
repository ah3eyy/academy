import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';

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

  constructor(private formbuilder: FormBuilder, private route: Router, private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit() {

    this.forgotPasswordInit();

  }


  forgotPasswordInit() {

    this.forgotPassword = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get f() {
    return this.forgotPassword.controls;
  }


  onForgotPassword(info: FormGroup) {

    this.loading = true;

    this.submitted = true;

    if (this.forgotPassword.invalid) {
      this.loading = false;
      return;
    }

    this.authService.forgotPassword(info.value).subscribe(
      data => {

        this.message = {'type': 'success', 'message': 'Reset e-mail has being sent to the provided email address.', 'status': true};

        this.loading = false;

      },

      error => {

        this.loading = false;

        let message = 'An error occurred';

        if (error.error) {
          message = error.error.message;
        }

        this.message = {'type': 'error', 'message': message, 'status': true};


      }
    );

  }

}
