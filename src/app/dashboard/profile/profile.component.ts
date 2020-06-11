import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading = false;

  network = false;

  success = false;

  externalLink = environment.api_url_link;

  data: any;

  profileUpdate: FormGroup;

  securityUpdate: FormGroup;

  loadEditPassword = false;

  loadEdit = false;

  submitted = false;

  constructor(private httpclient: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.profileUpdateInit();

    this.securityUpdateInit();

    this.load();

  }

  profileUpdateInit() {
    this.profileUpdate = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  securityUpdateInit() {
    this.securityUpdate = this.formBuilder.group({
      password: ['', [Validators.required]],
      old_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  load() {

    this.httpclient.get<any>(`${environment.api_url}v1/profile`).subscribe(
      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          this.data = data.data;

          let name = this.data.user.name.split(' ');

          this.profileUpdate.patchValue({
            first_name: name[0],
            last_name: name[1],
            email: this.data.user.email,
            address: this.data.user.address,
            phone: this.data.user.phone
          });

          return true;
        }

        this.network = true;

      },

      error => {

        this.loading = false;

        this.network = true;

      }
    );

  }

  get f() {
    return this.profileUpdate.controls;
  }

  get s() {
    return this.securityUpdate.controls;
  }

  onProfileUpdate() {

    this.loadEdit = true;

    this.httpclient.post<any>(`${environment.api_url}v1/update-profile`, this.profileUpdate.value).subscribe(
      data => {

        this.loadEdit = false;

        if (data.code == 1) {

          this.success = true;

          alert('Profile updated successfully');

          this.ngOnInit();

          return true;
        }

        alert('Update failed');

      },

      error => {

        this.loadEdit = false;

        alert('Update failed');

      }
    );
  }

  onSecurityUpdate() {

    this.loadEditPassword = true;

    this.httpclient.post<any>(`${environment.api_url}v1/update-security`, this.securityUpdate.value).subscribe(
      data => {

        this.loadEditPassword = false;

        if (data.code == 1) {

          this.success = true;

          alert('Password updated successfully');

          this.ngOnInit();

          return true;
        }

        alert('Update failed');

      },

      error => {

        this.loadEditPassword = false;

        alert('Update failed');

      }
    );
  }

  onReload() {
    this.ngOnInit();
  }

}
