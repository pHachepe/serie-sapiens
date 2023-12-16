import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // duda poner aqui o en app.module.ts
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_results: number;
  total_pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  constructor(private http: HttpClient) {}
 
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?page=${page}&api_key=${environment.apiKey}`
    );
  }
 
  getMovieDetails(id: string): Observable<any> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
}
