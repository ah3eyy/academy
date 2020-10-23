import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PaystackOptions} from 'angular4-paystack';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {PublicService} from '../../auth/public.service';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-nav-bar-details',
  templateUrl: './nav-bar-details.component.html',
  styleUrls: ['./nav-bar-details.component.scss']
})
export class NavBarDetailsComponent implements OnInit, OnChanges {

  @Input() details;

  @Input() user_paid = false;

  title;

  user_details;

  paymentLoading = false;

  options: PaystackOptions = {
    amount: 50000,
    email: 'user@mail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`
  };

  @ViewChild('makePaymentBtn', {static: false}) makePaymentBtn: ElementRef;

  constructor(
    public authService: AuthService,
    public router: Router,
    public cdf:ChangeDetectorRef,
    public userService:UserService
  ) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: any): void {
    this.details = this.details;
    this.user_details = this.authService.getUser();

    if (this.details.amount !== 0) {
      this.options = {
        amount: this.details.amount * 100,
        email: this.user_details.email,
        ref: `${Math.ceil(Math.random() * 10e10)}`
      };
    }
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
    this.cdf.detectChanges();
    this.paymentLoading = true;

    let dataQuery = {
      cid: this.details.cid,
      payment_id: this.options.ref
    };

    this.userService.confirmPayment(dataQuery).subscribe(
      (response: any) => {
        this.paymentLoading = false;
        alert('Payment successful');
        location.reload();
      },
      (error) => {
        this.paymentLoading = false;
        alert('An error occurred processing payment contact support');
      }
    );
  }

  paymentCancel() {
    console.log('payment failed');
  }


  enrollCourse() {
    if (!this.authService.isAuthenticate()) {
      return this.router.navigate(['/login']);
    }

    if (this.details.amount !== 0) {
      this.makePaymentBtn.nativeElement.click();
      return;
    }else{

      let dataQuery = {
        cid: this.details.cid,
      };

      this.paymentLoading = true;

      this.userService.enrollFreeCourse(dataQuery).subscribe(
        (response: any) => {
          this.paymentLoading = false;
          alert('Class enrolled successfully.');
          location.reload();
        },
        (error) => {
          this.paymentLoading = false;
          alert('An error occurred processing payment contact support');
        }
      );
    }
  }

}
