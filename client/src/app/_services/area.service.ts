import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Area } from '../_models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  baseUrl = environment.apiUrl;
  areas: Area[] = [];

  
  constructor(private http: HttpClient) { }

  getAllAreas() {
    if (this.areas.length > 0) return of(this.areas);
    return this.http.get<Area[]>(this.baseUrl + 'area').pipe(
      map(result => {
        this.areas = result;
        return this.areas;
      })
    );
  }

  
}