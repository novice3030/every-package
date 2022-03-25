import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {DeliveryDate} from 'src/models/delivery-date.model';
import {City} from './../models/city.model';

const BASE_URL = 'https://mock-stg.getpackage-dev.com';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{token: string}> {
    return this.http
      .post<{token: string}>(`${BASE_URL}/login`, {
        email,
        password,
      })
      .pipe(
        map(result => {
          if (result.token) {
            return result;
          }
          throw 'faild to login';
        }),
      );
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${BASE_URL}/cities`);
  }

  getDeliveryDates(): Observable<DeliveryDate[]> {
    return this.http.get<DeliveryDate[]>(`${BASE_URL}/times`);
  }
}
