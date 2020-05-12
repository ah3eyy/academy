import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  preorder: FormGroup

  submitted = false;

  loading = false;

  message;


  constructor(private http: HttpClient, private formbuilder: FormBuilder, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.preorderInit();
  }

  get f() { return this.preorder.controls; }


  preorderInit() {
    this.preorder = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      pop: ['', [Validators.required]]
    });
  }

  imageupload(events) {

    const file = (events.target as HTMLInputElement).files[0];

    this.preorder.patchValue({
      pop: file
    });

    const files = events.srcElement.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {


      this.cdf.detectChanges();

    };

    reader.readAsDataURL(files);

    this.cdf.detectChanges();
  }


  onSubmit(submitted: FormGroup) {
    this.loading = true;

    this.submitted = false;

    if (this.preorder.invalid) {
      this.loading = false;
      return;
    }

    var formData: any = new FormData();

    formData.append('pop', this.preorder.get('pop').value);

    formData.append('name', submitted.get('name').value);

    formData.append('phone', submitted.get('phone').value);

    formData.append('email', submitted.get('email').value);


    this.http.post<any>(`${environment.api_url}auth/register-user`, formData).subscribe(

      data => {

        if (data.code == 1) {

          this.loading = false;

          this.submitted = false;

          this.ngOnInit();

          this.message = { 'type': 'success', 'message': 'Successfully pre-ordered. A payment confirmation mail would be sent to you on after payment has being confirmed.', 'status': true };
          
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
