import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hero {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/heroes',
      {
        params: {
          age: 30,
        }
      });
  }
}
