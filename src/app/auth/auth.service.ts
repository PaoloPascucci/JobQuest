import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtH = new JwtHelperService();
  apiUrl = environment.apiURL;

  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}
  // private handleError(error: HttpErrorResponse) {
  //   let errMsg = '';
  //   if (error.status === 0) {
  //     console.log("C'è un errore:", error.error);
  //   } else {
  //     console.log('è arrivato codice', error.status, 'body è:', error.error);
  //     errMsg = error.error;
  //   }
  //   return throwError(
  //     () => new Error('Qualcosa è andato storto, riprova più tardi')
  //   );
  // }
  // getUser() {
  //   const user = localStorage.getItem('user');
  //   if (!user) {
  //     console.log('user non esistente');
  //     return;
  //   }
  //   return JSON.parse(user);
  // }
  getUserId() {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log('user non esistente');
      return;
    }
    const userData: AuthData = JSON.parse(user);

    return userData.user.id;
  }
  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiUrl}/login`, data).pipe(
      tap((loggato) => {
        //console.log(loggato);
        this.authSubj.next(loggato);
        this.utente = loggato;
        //console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(loggato));
        //console.log(this.user$);
        alert('Login Effettuato');
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    console.log(user);

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtH.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['/login']);
      return;
    }
    this.authSubj.next(userData);
  }

  register(data: {
    nome: string;
    cognome: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      catchError(this.errors)
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private errors(err: any) {
    console.log(err);
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
