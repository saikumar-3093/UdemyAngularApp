import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthInterceptorService } from './auth-interceptor.service';
import { User } from './user.model';
export interface AuthUserData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null)
  tokenExpirationTimer: any;
  constructor(private http: HttpClient,
    private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthUserData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB42ZM5I3NVnu_etbAnnaWI0Q1eWljrkuY',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(catchError(this.errorHandler),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
          // const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          // const user = new User(
          //   resData.email,
          //   resData.localId,
          //   resData.idToken,
          //   expirationDate
          // );
          // this.user.next(user);
        }
        )
      )

  }


  login(email: string, password: string) {
    return this.http.post<AuthUserData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB42ZM5I3NVnu_etbAnnaWI0Q1eWljrkuY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.errorHandler),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn )
      })
      )
  }



  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    )
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occurred'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email is not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong Password';

    }
    return throwError(errorMessage)
  }

  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate : string;
    } = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return;
    }

   const loadedUser = new User(
     userData.email, 
     userData.id, 
     userData._token, 
     new Date(userData._tokenExpirationDate))
   
   if(loadedUser.token){
     this.user.next(loadedUser);
     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
     this.autoLogout(expirationDuration);
   }
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    },
    expirationDuration)
  }
}