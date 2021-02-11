import { Component, OnInit, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.afAuth.user.subscribe((user: any) => {
      if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        sessionStorage.setItem('currentUser', '{}');
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }


  login() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.router.navigate(['/home']);
    }).catch((response: any) => {
      this.errorMessage = response.message;
    });
  }
}
