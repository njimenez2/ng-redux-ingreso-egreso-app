import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FirebaseAuthService} from './firebase-auth.service';
import {take, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseGuard implements CanActivate, CanLoad {

  constructor(private firebaseAuthService: FirebaseAuthService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.firebaseAuthService.isAuth().pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigate([environment.home]);
        }
      }),
      take(1)
    );
  }

  canLoad(): Observable<boolean> {
    return this.firebaseAuthService.isAuth().pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigate([environment.home]);
        }
      })
    );
  }
}
