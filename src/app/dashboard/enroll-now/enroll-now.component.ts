import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-enroll-now',
  templateUrl: './enroll-now.component.html',
  styleUrls: ['./enroll-now.component.scss']
})
export class EnrollNowComponent implements OnInit {

  loading = false;

  network = false;

  success = false;

  data: any;

  getParam;

  submit = false;

  message: any;

  updateProfile: FormGroup;

  error = false;

  constructor(private httpclient: HttpClient, private activeRouter: ActivatedRoute, private formbuilder: FormBuilder) {

    this.getParam = this.activeRouter.params['value'].courseid;

  }

  ngOnInit() {

    this.error = false;
    
    this.loading = true;

    this.network = false;

    this.success = false;

    this.updateProfileInit();

    this.load();

  }

  load() {

    this.httpclient.get<any>(`${environment.api_url}v1/enroll-now/${this.getParam}`).subscribe(

      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          this.data = data.data;

          const name = this.data.info.name.split(' ');

          this.updateProfile.patchValue({
            firstname: name[0],
            lastname: name[1],
            email: this.data.info.email,
            phone: this.data.info.phone,
            address: this.data.info.address
          });

          return true;
        }

        this.network = true;

      },

      error => {

        this.network = true;

        this.loading = false;

      }


    );


  }

  updateProfileInit() {

    this.updateProfile = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

  }

  onUpdateProfile(submitted: FormGroup) {

    this.submit = true;

    this.httpclient.put<any>(`${environment.api_url}v1/update-purchase-profile`, submitted.value).subscribe(

      data => {

        this.submit = false;

        if (data.code == 1) {

          this.data.info = data.data.info;

          const d = document.getElementById('collapseaddress1');

          d.classList.remove('show');

          return true;
        }

        this.error = true;

        this.message = 'An error occurred';

      },

      error => {

        this.submit = false;

        this.error = true;
        
        this.message = error.error.short_description;

      }

    );


  }

  onReload() {
    this.ngOnInit();
  }

}
