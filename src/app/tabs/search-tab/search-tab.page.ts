import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { ApiResult } from 'src/app/models/result.model';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
})
export class SearchTabPage implements OnInit {
  searchQuery: string = '';
  searchResults: ApiResult | null = null;
  isLoading = false;
  private searchSubject = new Subject<string>();

  constructor(private router: Router, private moviedbService: MoviedbService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500), // Espera 500ms después de cada cambio
        distinctUntilChanged(), // Solo emite si el valor actual es diferente al anterior
        switchMap((query) => {
          this.isLoading = true;
          if (!query.trim()) {
            this.isLoading = false;
            return []; // Evita búsquedas vacías
          }
          return this.moviedbService.search(query);
        })
      )
      .subscribe(
        (results) => {
          this.searchResults = results;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al realizar la búsqueda:', error);
          this.isLoading = false;
        }
      );
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  openDetails(item: any) {
    this.router.navigate(['/tabs/details', item.media_type, item.id]);
  }
}
