import { Injectable, Inject } from '@angular/core';
// import {
//   MatSnackBar,
//   MatSnackBarConfig,
//   MatDialog,
//   MatDialogConfig,
//   TOOLTIP_PANEL_CLASS,
//   MatMonthView,
// } from '@angular/material';
// import {
//   BreakpointObserver,
//   Breakpoints,
//   BreakpointState,
//   MediaMatcher
// } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable()
export class UiService {
  // isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(
  //   Breakpoints.XSmall
  // );

  // mobileQuery: MediaQueryList;
  // private dialogRef: any;
  // private _mobileQueryListener: () => void;

  // constructor(private snackBar: MatSnackBar,
  //   public media: MediaMatcher, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
  //   this.mobileQuery = media.matchMedia('(max-width: 600px)');
  //   this._mobileQueryListener = () => {
  //     // changeDetectorRef.detectChanges();
  //   }

  //   this.mobileQuery.addListener(this._mobileQueryListener);
  // }

  // showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
  //   this.snackBar.open(
  //     message,
  //     action,
  //     config || {
  //       duration: 7000,
  //       horizontalPosition: 'right',
  //       verticalPosition: 'bottom',
  //     }
  //   );
  // }

  // opendialog(component, data: any) {
  //   const dialogRef = this.dialog.open(component, {
  //     width: '500px',
  //     maxWidth: '100%',
  //     data: { data }
  //   });

  //   const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
  //     if (size.matches) {
  //       dialogRef.updateSize('100%', '100%');
  //     } else {
  //       dialogRef.updateSize('500px', '');
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     smallDialogSubscription.unsubscribe();
  //   });

  //   return dialogRef.afterClosed();
  // }

  // opendialogv2(component, data: any, callable) {
  //   const dialogRef = this.dialog.open(component, {
  //     width: '500px',
  //     maxWidth: '100%',
  //     data: { data }
  //   });

  //   const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
  //     if (size.matches) {
  //       dialogRef.updateSize('100%', '100%');
  //     } else {
  //       dialogRef.updateSize('500px', '');
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe((r) => {
  //     smallDialogSubscription.unsubscribe();
  //     callable(r);
  //   });
  // }


  // openDialogv3(component, detectorRef, dialogData, callable, normalSize: string = "600px", containerClass: string = "") {

  //   if (normalSize == null || normalSize == undefined || normalSize == "" || normalSize.length == 0) {
  //     normalSize == "600px";
  //   }

  //   if (detectorRef != null) {
  //     this._mobileQueryListener = () => {
  //       detectorRef.detectChanges();
  //       if (this.dialogRef != null) {
  //         if (this.mobileQuery.matches) {
  //           this.dialogRef.updateSize("100vw", "100vh");
  //         }

  //         else {
  //           this.dialogRef.updateSize(normalSize, 'auto');
  //         }
  //       }
  //     }

  //     this.mobileQuery.removeListener(this._mobileQueryListener);

  //     this.mobileQuery.addListener(this._mobileQueryListener);
  //   }

  //   if (this.mobileQuery.matches) {

  //     this.dialogRef = this.dialog.open(component, {
  //       width: '100vw', //we can use breakpoint observer or media query to customize width of dialog here.
  //       height: '100vh',
  //       maxWidth: 'none',
  //       panelClass: containerClass,
  //       data: dialogData
  //     });
  //     this.dialogRef.afterClosed().subscribe(result => {
  //       callable(result);
  //     });

  //   } else {
  //     this.dialogRef = this.dialog.open(component, {
  //       width: normalSize, //we can use breakpoint observer or media query to customize width of dialog here.
  //       maxWidth: '100vw',
  //       panelClass: containerClass,
  //       data: dialogData
  //     });

  //     this.dialogRef.afterClosed().subscribe(result => {
  //       callable(result);
  //     });
  //   }

  // }

  // updateUserTime(query, detectorRef) {


  //   const oldTime = (new Date(query * 1000)).getTime();

  //   const timestamp = (new Date()).getTime();

  //   let r = Math.abs(timestamp - oldTime) / 1000;


  //   const months = Math.floor(r / 2419200);
  //   r -= months * 2419200;

  //   const days = Math.floor(r / 86400);
  //   r -= days * 86400;

  //   const hours = Math.floor(r / 3600) % 24;
  //   r -= hours * 3600;

  //   const minutes = Math.floor(r / 60) % 24;
  //   r -= minutes * 60;

  //   const seconds = Math.floor(r % 60);

  //   const payLoads = {
  //     month: months,
  //     day: days,
  //     hour: hours,
  //     minute: minutes,
  //     second: seconds
  //   };

  //   return this.dateTimeDataCal(payLoads);

  // }

  // dateTimeDataCal(query: any) {

  //   if (query.month > 0) {

  //     const d = (query.month > 1) ? ' Months ago' : ' Month ago';

  //     return query.month + d;

  //   } else if (query.day > 0) {

  //     const d = (query.day > 1) ? ' Days ago' : ' Day ago';

  //     return query.day + d;
  //   } else if (query.hour > 0) {

  //     const d = (query.hour > 1) ? ' Hours ago' : ' Hour ago';

  //     return query.hour + d;
  //   } else if (query.minute > 0) {

  //     const d = (query.minute > 1) ? ' Minutes ago' : ' Minute ago';

  //     return query.minute + d;

  //   } else {

  //     const d = (query.second === 0) ? 'Just Now' : query.second + ' Seconds ago';

  //     return d;

  //   }
  // }
}

