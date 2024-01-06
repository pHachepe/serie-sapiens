import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { LoadingController } from '@ionic/angular';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { MediaType } from 'src/app/models/media-types.model';
import { Result } from 'src/app/models/result.model';
import { Video } from 'src/app/models/video.model';
import { UserListService } from 'src/app/services/user-list/user-list.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: 'resource-details.page.html',
})
export class ResourceDetailsPage implements OnInit, OnDestroy {
  resultDetails: Result | null = null;
  trailerUrlSafe: SafeResourceUrl | null = null;
  id: number | null = null;
  media_type: MediaType = 'movie';
  flatrateProviders$!: Observable<any[]>;
  rentProviders$!: Observable<any[]>;
  buyProviders$!: Observable<any[]>;
  recommendations$!: Observable<Result[]>;

  isWatched = false;
  isPending = false;
  isFavorite = false;

  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private moviedbService: MoviedbService,
    private userListService: UserListService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        this.id = Number(params.get('id'));
        this.media_type = params.get('media_type') as MediaType;
        if (!this.id || !this.media_type) throw new Error('No ID or media type available');

        const details$ = this.moviedbService.getDetails(this.id, this.media_type);
        const trailers$ = this.moviedbService.getTrailers(this.id, this.media_type);
        const providers$ = this.moviedbService.getProviders(this.id, this.media_type);
        const recommendations$ = this.moviedbService
          .getRecommendations(this.id, this.media_type)
          .pipe(map((response) => response.results.filter((result) => result.poster_path)));

        return forkJoin({ details: details$, trailers: trailers$, providers: providers$, recommendations: recommendations$ });
      }),
      switchMap(({ details, trailers, providers, recommendations }) => {
        if (!trailers.results.length) {
          return forkJoin({
            details: of(details),
            trailers: this.moviedbService.getTrailers(details.id, this.media_type, 'en-US'),
            providers: of(providers),
            recommendations: of(recommendations),
          });
        }
        return of({ details, trailers, providers, recommendations });
      }),
      tap(({ details, trailers, providers, recommendations }) => {
        if (details) {
          this.resultDetails = { ...details, media_type: this.media_type }
          this.showTrailer(trailers.results);
          this.flatrateProviders$ = of(providers).pipe(map((providersData) => providersData?.flatrate || []));
          this.rentProviders$ = of(providers).pipe(map((providersData) => providersData?.rent || []));
          this.buyProviders$ = of(providers).pipe(map((providersData) => providersData?.buy || []));
          this.recommendations$ = of(recommendations);
          this.checkItemStatus();
          loading.dismiss();
        }
      }),
      catchError((error) => {
        console.error('Error fetching details:', error);
        loading.dismiss();
        return of(null);
      })
    ).subscribe();
  }

  showTrailer(videos: Video[]) {
    const trailer = videos.find((video) => video.type === 'Trailer' && video.key) || videos.find((video) => video.key);
    if (trailer) {
      const videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
      this.trailerUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    } else {
      this.trailerUrlSafe = null;
    }
  }

  async shareContent() {
    try {
      let shareMessage = 'Mira ' + (this.resultDetails?.title || this.resultDetails?.name) + ' en SerieSapiens: \n';
      let shareUrl = 'https://seriesapiens.com/' + this.resultDetails?.media_type + '/' + this.resultDetails?.id;
      const imageUrl = this.resultDetails?.backdrop_path || this.resultDetails?.poster_path;
      if (imageUrl) shareUrl += '\n\nhttps://image.tmdb.org/t/p/w500' + imageUrl;
      await Share.share({
        title: this.resultDetails?.title || this.resultDetails?.name,
        text: shareMessage,
        url: shareUrl,
        dialogTitle: 'Compartir contenido',
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }

  toggleInList(list: 'watched' | 'pending' | 'favorites') {
    if (this.resultDetails) {
      this.userListService.toggleItemInList(list, this.resultDetails);
      this.checkItemStatus();
    }
  }

  checkItemStatus() {
    if (this.resultDetails) {
      const itemId = this.resultDetails.id;
      this.isWatched = this.userListService.isInList('watched', itemId);
      this.isPending = this.userListService.isInList('pending', itemId);
      this.isFavorite = this.userListService.isInList('favorites', itemId);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
