import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { MediaType } from 'src/app/models/media-types.model';
import { Result } from 'src/app/models/result.model';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-resource-details',
  templateUrl: 'resource-details.page.html',
})
export class ResourceDetailsPage implements OnInit {
  openLink(arg0: any) {
    throw new Error('Method not implemented.');
  }
  resultDetails: Result | null = null;
  trailerUrlSafe: SafeResourceUrl | null = null;
  id: number | null = null;
  media_type: MediaType = 'movie';
  flatrateProviders$!: Observable<any[]>;
  rentProviders$!: Observable<any[]>;
  buyProviders$!: Observable<any[]>;
  recommendations$!: Observable<Result[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private moviedbService: MoviedbService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          this.media_type = params.get('media_type') as MediaType;

          if (!this.id || !this.media_type) {
            throw new Error('No ID or media type available');
          }

          const details$ = this.moviedbService.getDetails(
            this.id,
            this.media_type
          );
          const trailers$ = this.moviedbService.getTrailers(
            this.id,
            this.media_type
          );
          const providers$ = this.moviedbService.getProviders(
            this.id,
            this.media_type
          );

          this.recommendations$ = this.moviedbService
            .getRecommendations(this.id, this.media_type)
            .pipe(
              map((response) =>
                response.results.map((result) => ({
                  ...result,
                  media_type: this.media_type,
                }))
              )
              //finalize(() => loading.dismiss())
            );

          return forkJoin({
            details: details$,
            trailers: trailers$,
            providers: providers$,
          });
        }),
        switchMap(({ details, trailers, providers }) => {
          if (!trailers.results.length) {
            // Si no hay trailers, buscar trailers en inglés
            return forkJoin({
              details: of(details),
              trailers: this.moviedbService.getTrailers(
                details.id,
                this.media_type,
                'en-US'
              ),
              providers: of(providers),
            });
          }
          return of({ details, trailers, providers });
        }),
        tap(({ details, trailers, providers }) => {
          if (details) {
            this.resultDetails = details;
            this.showTrailer(trailers.results);
            this.flatrateProviders$ = of(providers).pipe(
              map((providersData) => providersData?.flatrate || [])
            );
            this.rentProviders$ = of(providers).pipe(
              map((providersData) => providersData?.rent || [])
            );
            this.buyProviders$ = of(providers).pipe(
              map((providersData) => providersData?.buy || [])
            );
          }
        }),
        catchError((error) => {
          console.error('Error fetching details:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  showTrailer(videos: Video[]) {
    if (videos && videos.length > 0) {
      const trailer =
        videos.find((video) => video.type === 'Trailer' && video.key) ||
        videos.find((video) => video.key);
      if (trailer) {
        const videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
        this.trailerUrlSafe =
          this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      } else {
        this.trailerUrlSafe = null;
      }
    } else {
      this.trailerUrlSafe = null;
    }
  }

  async shareContent() {
    try {
      let shareMessage =
        'Mira ' +
        (this.resultDetails?.title || this.resultDetails?.name) +
        ' en SerieSapiens: \n';
      let shareUrl =
        'https://seriesapiens.com/' +
        this.resultDetails?.media_type +
        '/' +
        this.resultDetails?.id;

      const imageUrl =
        this.resultDetails?.backdrop_path || this.resultDetails?.poster_path;
      if (imageUrl) {
        shareUrl += '\n\nhttps://image.tmdb.org/t/p/w500' + imageUrl;
      }

      await Share.share({
        title: this.resultDetails?.title || this.resultDetails?.name,
        text: shareMessage,
        url: shareUrl,
        dialogTitle: 'Compartir contenido',
      });

      console.log('Contenido compartido con éxito');
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }

  addToPending() {
    throw new Error('Method not implemented.');
  }

  addToFavorites() {
    throw new Error('Method not implemented.');
  }

  addToWatched() {
    throw new Error('Method not implemented.');
  }
}
