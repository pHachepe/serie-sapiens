import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { MediaType } from '../models/media-types.model';
import { ApiResult, Result } from '../models/result.model';
import { Video, Videos } from '../models/video.model';

@Injectable({
  providedIn: 'root',
})
export class MoviedbService {
  private apiUrl = environment.baseUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  private buildUrl(path: string, params: any = {}): string {
    const query = new URLSearchParams({
      ...params,
      api_key: this.apiKey,
    }).toString();
    return `${this.apiUrl}/${path}?${query}`;
  }

  getDetails(id: number, type: MediaType): Observable<Result> {
    let path = `${type}/${id}`;
    return this.http.get<Result>(this.buildUrl(path, { language: 'es-ES' }));
  }

  getProviders(
    mediaId: number,
    type: MediaType,
    countryCode: string = 'ES'
  ): Observable<any> {
    let path = `${type}/${mediaId}/watch/providers`;
    return this.http.get<any>(this.buildUrl(path)).pipe(
      map((response) => response.results[countryCode] || null),
      map((result) => {
        if (result) {
          ['flatrate', 'rent', 'buy'].forEach((category) => {
            if (result[category]) {
              result[category].forEach((provider: any) => {
                provider.logo_path = `https://www.themoviedb.org/t/p/w92/${provider.logo_path}`;
              });
            }
          });
        }
        return result;
      })
    );
  }

  getRecommendations(
    mediaId: number,
    type: MediaType,
    page: number = 1
  ): Observable<ApiResult> {
    let path = `${type}/${mediaId}/recommendations`;
    return this.http
      .get<ApiResult>(
        this.buildUrl(path, { language: 'es-ES', page})
      )
      .pipe(
        map((apiResult) => ({
          ...apiResult,
          results: apiResult.results
            .filter((item) => item.poster_path)
            .sort((item1, item2) => item2.popularity - item1.popularity),
        }))
      );
  }

  getMediaList(
    type: MediaType,
    category: string,
    page: number = 1
  ): Observable<ApiResult> {
    let path = `${type}/${category}`;
    return this.http.get<ApiResult>(
      this.buildUrl(path, { language: 'es-ES', page })
    );
  }

  getTrending(
    type: MediaType,
    timeWindow: string,
    page: number = 1
  ): Observable<ApiResult> {
    let path = `trending/${type}/${timeWindow}`;
    return this.http.get<ApiResult>(
      this.buildUrl(path, { language: 'es-ES', page })
    );
  }

  getPopularMovies(page: number = 1) {
    return this.getMediaList('movie', 'popular', page);
  }

  getTrendingMovies(page: number = 1) {
    return this.getTrending('movie', 'day', page);
  }

  getPopularSeries(page: number = 1) {
    return this.getMediaList('tv', 'popular', page);
  }

  getTrendingSeries(page: number = 1) {
    return this.getTrending('tv', 'day', page);
  }

  // Método para obtener documentales populares
  getPopularDocumentaries(page: number = 1) {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&with_genres=99&language=es-ES&page=${page}`
    );
  }

  // Método para obtener los mejor valorados
  getTopRated(type: MediaType, page: number = 1) {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/discover/${type}?api_key=${environment.apiKey}&include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`
    );
  }

  // Método para obtener las películas mejor valoradas
  getTopRatedMovies(page: number = 1) {
    return this.getTopRated('movie', page);
  }

  // Método para obtener las series mejor valoradas
  getTopRatedSeries(page: number = 1) {
    return this.getTopRated('tv', page);
  }

  // Método para obtener los documentales mejor valorados
  getTopRatedDocumentaries(page: number = 1) {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=vote_average.desc&with_genres=99&vote_count.gte=200`
    );
  }

  // Método para obtener los próximos estrenos
  getUpcoming(type: MediaType, page: number = 1) {
    let path = `${type}/upcoming`;
    return this.http.get<ApiResult>(
      this.buildUrl(path, { language: 'es-ES', page })
    );
  }

  getTrailers(
    id: number,
    type: MediaType,
    language: string = 'es-ES'
  ): Observable<Videos> {
    let path = `${type}/${id}/videos`;
    return this.http.get<any>(this.buildUrl(path, { language })).pipe(
      map((result) => {
        result.results.forEach((video: Video) => {
          video.url = `https://www.youtube.com/embed/${video.key}`;
        });
        return result;
      })
    );
  }

  search(query: string): Observable<ApiResult> {
    const path = 'search/multi';
    return this.http
      .get<ApiResult>(this.buildUrl(path, { language: 'es-ES', query }))
      .pipe(
        map((apiResult) => ({
          ...apiResult,
          results: apiResult.results.filter(
            (result) => result.media_type !== 'person' && result.vote_count > 0
          ),
        }))
      );
  }
}
