import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { ApiResult, Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
})
export class SearchTabPage implements OnInit {
  @ViewChild(IonSearchbar) inputSearch!: IonSearchbar;

  searchQuery: string = '';
  searchResults: ApiResult | null = null;
  isLoading = false;
  private searchSubject = new Subject<string>();

  constructor(
    private navCtrl: NavController,
    private moviedbService: MoviedbService
  ) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500), // Wait 500ms after each keystroke before considering the term
        distinctUntilChanged(), // Only emit when the current value is different than the last
        switchMap((query) => {
          this.isLoading = true;
          if (!query.trim()) {
            this.isLoading = false;
            return []; // Avoid empty searches
          }
          return this.moviedbService.search(query);
        })
      )
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al realizar la búsqueda:', error);
          this.isLoading = false;
        },
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.inputSearch.setFocus();
    }, 300);
  }

  openDetails(item: Result) {
    this.navCtrl.navigateForward([
      'tabs/searchtab/details',
      item.media_type,
      item.id,
    ]);
  }
}
