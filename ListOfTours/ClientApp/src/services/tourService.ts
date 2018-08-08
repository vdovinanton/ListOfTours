import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators'

import { Tour } from "../models/Tour";
import { IRequestResult } from '../models/RequestResult'

@Injectable()
export class TourService {
  private _tour = "/api/tour"
  private _tokeyKey = "token";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private getLocalToken(): string {
    return sessionStorage.getItem(this._tokeyKey);
  }

  public CreateOrUpdate(tour: Tour): Observable<Tour> {
    let headers = this.initAuthHeaders();

    return this.http.post<IRequestResult>(this._tour, tour, { headers: headers })
      .pipe(
        map(
          res => {
            let tour: Tour;
            tour = res.data.tour as Tour;
            return tour;
          }
        )
      );
  }

  public getTours(): Observable<Tour[]> {
    let headers = this.initAuthHeaders();

    return this.http.get<IRequestResult>(this._tour, { headers: headers })
      .pipe(
        map(
          res => {
            let tours: Tour[];
            tours = res.data.tours as Tour[];
            return tours;
          }
        )
      )
  }

  private initAuthHeaders(): HttpHeaders {
    let token = this.getLocalToken();
    if (token == null) throw "No token";

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + token);
    return headers;
  }
}
