import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseAuthService} from '../../firebase/services/firebase-auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
  userSubcriber: Subscription;
  userName: string;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
   this.userSubcriber = this.store.select('auth').pipe(
      filter(({user}) => user != null)
    ).subscribe(({user}) => {
      this.userName = user.name;
    });
  }

  ngOnDestroy(): void {
    this.userSubcriber.unsubscribe();
  }

  logout(): void {
    this.firebaseAuthService.signOut()
      .then(() => this.router.navigate(['/login']));

  }
}
