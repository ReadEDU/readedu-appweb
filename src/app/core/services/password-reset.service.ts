import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private baseURL = `${environment.apiURL}/mail`;

  private http = inject(HttpClient);

  sendResetPasswordEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseURL}/sendMail`, email);
  }

  checkTokenValidity(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/reset/check/${token}`);
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseURL}/reset/${token}`, newPassword);
  }
}