import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  reset: FormGroup;

  loading = false;

  submitted = false;

  message;

  getParam;

  constructor(private http: HttpClient, private formbuilder : FormBuilder, private activeRouter: ActivatedRoute, private route: Router) { }

  ngOnInit() {

    this.resetInit();

    this.getParam = this.activeRouter.params['value'].token;

    this.reset.patchValue({
      token: this.getParam
    });

  }

  resetInit(){

    this.reset = this.formbuilder.group({

      token: ['', [Validators.required]],

      password: ['', [Validators.required]],

      confirmpassword: ['', [Validators.required]]

    });

  }

  get f() { return this.reset.controls; }

  onSumit(info: FormGroup){
    
    this.loading = true;

    this.submitted = true;

    if (this.reset.invalid) {
      this.loading = false;
      return;
    }


    this.http.post<any>(`${environment.api_url}auth/reset-password`, info.value).subscribe(

      data => {

        if (data.code == 1) {

          this.loading = false;

          this.submitted = false;

          this.message = { 'type': 'success', 'message': 'Password reset successfully.', 'status': true };

          this.route.navigate(['/login']);

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
