import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import endpoints from './endpoints';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducers';
import * as fromActions from '../store/actions';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
    private db: AngularFireDatabase,
  ) {}

  login(data: any) {
    return this.http.get<any>(
      `${endpoints.AUTH.LOGIN}`, {
        params: data,
      }
    );
  }

  getSession() {
    return of(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }

  clearStorage() {
    this.store.dispatch(new fromActions.ClearAuth());
  }

  public getUsers() {
    return this.db.list('usuarios');
  }

  public getUser(id: string) {
    return this.db.object('usuarios/' + id);
  }
}
