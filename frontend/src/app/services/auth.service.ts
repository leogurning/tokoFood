import { Injectable, inject } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = "User";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  #http = inject(HttpClient);
  private toastrService = inject(ToastrService);

  constructor() { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.#http.post<User>(USER_LOGIN_URL, userLogin).pipe(
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
}
