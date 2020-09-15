import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(
    private authService: AuthService,
    private route: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.loginUserInit();

  }

  get f() {
    return this.loginUser.controls;
  }


  loginUserInit() {

    this.loginUser = this.formBuilder.group({

      email: ['', [Validators.required]],

      password: ['', [Validators.required]]

    });

  }


  async onSubmit(credentials: FormGroup) {

    this.loading = true;

    this.submitted = false;

    if (this.loginUser.invalid) {
      this.loading = false;
      return;
    }

    this.authService.userLogin(this.loginUser.value).subscribe(
      async (response: any) => {

        this.loading = false;

        this.authService.login(response.data.access_token);

        this.authService.saveUser(response.data.user);

        this.message = {
          'type': 'success',
          'message': 'Access granted. Proceed to login',
          'status': true
        };

        await this.route.navigate(['/']);

      },
      (error) => {
        this.loading = false;
        this.message = {
          'type': 'error',
          'message': (error.error) ? error.error.message || 'Internet connection error' : 'An error occurred accessing account',
          'status': true
        };
      }
    );


  }


}
