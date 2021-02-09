import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import endpoints from './endpoints';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.get<any>(
      `${endpoints.AUTH.LOGIN}`, {
        params: data,
      }
    );
  }
}
