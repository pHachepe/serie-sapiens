import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MoviedbService } from '../api/moviedb.service';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from '../models/result.model';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-tab-trending',
  templateUrl: 'tab-trending.page.html'
})
export class TabTrendingPage implements OnInit {
  topTenTrendingMovies$!: Observable<Result[]>;
  popularMovies$!: Observable<Result[]>;
  topTenTrendingSeries$!: Observable<Result[]>;
  popularSeries$!: Observable<Result[]>;
  popularDocumentaries$!: Observable<Result[]>;
  topTenRatedMovies$!: Observable<Result[]>;
  topTenRatedSeries$!: Observable<Result[]>;
  topTenRatedDocumentaries$!: Observable<Result[]>;

  constructor(
    private moviedbService: MoviedbService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.presentLoading();

    this.topTenTrendingMovies$ = this.moviedbService.getTrendingMovies().pipe(
      map((response) =>
        response.results.map((result) => ({ ...result, media_type: 'movie' }))
      ),
      finalize(() => loading.dismiss())
    );
    this.popularMovies$ = this.moviedbService.getPopularMovies().pipe(
      map((response) =>
        response.results.map((result) => ({ ...result, media_type: 'movie' }))
      ),
      finalize(() => loading.dismiss())
    );

    this.topTenTrendingSeries$ = this.moviedbService.getTrendingSeries().pipe(
      map((response) =>
        response.results.map((result) => ({ ...result, media_type: 'tv' }))
      ),
      finalize(() => loading.dismiss())
    );
    this.popularSeries$ = this.moviedbService.getPopularSeries().pipe(
      map((response) =>
        response.results.map((result) => ({ ...result, media_type: 'tv' }))
      ),
      finalize(() => loading.dismiss())
    );

    this.popularDocumentaries$ = this.moviedbService
      .getPopularDocumentaries()
      .pipe(
        map((response) =>
          response.results.map((result) => ({ ...result, media_type: 'movie' }))
        ),
        finalize(() => loading.dismiss())
      );

    this.topTenRatedMovies$ = this.moviedbService.getTopRatedMovies().pipe(
      map((response) =>
        response.results.map((result) => ({ ...result, media_type: 'movie' }))
      ),
      finalize(() => loading.dismiss())
    );
    this.topTenRatedSeries$ = this.moviedbService.getTopRatedSeries().pipe(
      map((response) =>
        response.results.map((result) => ({ ...result, media_type: 'tv' }))
      ),
      finalize(() => loading.dismiss())
    );
    this.topTenRatedDocumentaries$ = this.moviedbService
      .getTopRatedDocumentaries()
      .pipe(
        map((response) =>
          response.results.map((result) => ({ ...result, media_type: 'movie' }))
        ),
        finalize(() => loading.dismiss())
      );
  }

  private async presentLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles',
    });
    await loading.present();
    return loading;
  }

  /*
  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.moviedbService.getLatestMovies().subscribe(
      (res) => {
        loading.dismiss();
        this.movies.push(...res.results);

        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === 1; // this.currentPage
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  */
}
