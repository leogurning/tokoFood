import { Injectable, inject } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = "User";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);

  constructor() { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({ 
              next: user => {
                this.setUserToLocalStorage(user);
                this.userSubject.next(user);
                this.toastrService.success(
                  `Welcome ${user.name}`,
                  'Login Successful'
                );
              },
              error: err => {
                this.toastrService.error('Invalid email or password', 'Login Failed')
              }
            }),
            catchError( err => {
              throw `Error in auth service. Details: ${err.message} > ${JSON.stringify(err.error)}`;
            })
        )
  }

  register(userRegiser: IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User {
    let userJson;
    if (typeof localStorage !== 'undefined') {
      userJson = localStorage.getItem(USER_KEY);
      if (userJson) return JSON.parse(userJson) as User;
    }

    return new User();
  }

  public get currentUser():User {
    return this.userSubject.value;
  }
}
