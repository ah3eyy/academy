import { Injectable } from '@angular/core';
import { CacheService } from './caches.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(private httpClient: HttpClient, private route: Router, private Authservice: AuthService) {
  }



  // initializeSocketConnection(event) {

  //   const tokens = this.Authservice.getToken();

  //   const socket = new WebSocket(environment.SOCKET_URL);

  //   socket.onopen = (e) => {

  //     socket.send(JSON.stringify({ type: 'CLIENT_REGISTRATION', token: tokens }));

  //   },
  //     socket.onmessage = (e) => {
  //       event(e);
  //     };

  //   return socket;

  // }


}
