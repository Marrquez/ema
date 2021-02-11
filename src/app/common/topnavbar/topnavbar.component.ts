import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app.reducers';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {SetAuth} from '../../store/actions';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.sass']
})
export class TopnavbarComponent implements OnInit {
  user: User = new User({
    uid: '',
    email: '',
    emailVerified: false,
    apiKey: '',
    authDomain: '',
    displayName: '',
    lastLoginAt: '',
    photoURL: '',
    stsTokenManager: {},
  });
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private store: Store<IAppState>,
    private as: AuthService,
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      if(authState && authState.user && authState.user.uid) {
        this.user = authState.user;
      }
    });

    this.as.getSession().subscribe((usrObj: User) => {
      const newUser = new User(usrObj);
      this.store.dispatch(new SetAuth(newUser));
    }, () => {
      sessionStorage.removeItem('currentUser');
      this.as.clearStorage();
      this.router.navigate(['login']);
    });
  }

  showMenuItems () {
    return this.router.url !== '/home';
  }

  // Sign out
  logOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('currentUser');
      this.as.clearStorage();
      this.router.navigate(['login']);
    })
  }
}
