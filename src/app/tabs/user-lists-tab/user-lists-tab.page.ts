import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';
import { Result } from 'src/app/models/result.model';
import { UserListService } from 'src/app/services/user-list/user-list.service';

@Component({
  selector: 'app-user-lists-tab',
  templateUrl: './user-lists-tab.page.html',
})
export class UserListsTabPage {
  pendingList$: Observable<Result[]>;
  favoritesList$: Observable<Result[]>;
  watchedList$: Observable<Result[]>;

  @ViewChild('pendingSwiper') pendingSwiper!: SwiperComponent;
  @ViewChild('favoritesSwiper') favoritesSwiper!: SwiperComponent;
  @ViewChild('watchedSwiper') watchedSwiper!: SwiperComponent;

  constructor(private userListService: UserListService) {
    this.pendingList$ = this.userListService.getPendingListObservable();
    this.favoritesList$ = this.userListService.getFavoritesListObservable();
    this.watchedList$ = this.userListService.getWatchedListObservable();
  }

  ionViewDidEnter() {
    this.updateSwiper(this.pendingSwiper);
    this.updateSwiper(this.favoritesSwiper);
    this.updateSwiper(this.watchedSwiper);
  }

  private updateSwiper(swiper: SwiperComponent) {
    if (swiper && swiper.items.length) {
      swiper.updateConfig();
    }
  }
}
