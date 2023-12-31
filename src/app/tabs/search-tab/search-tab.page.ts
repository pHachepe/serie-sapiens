import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private moviedbService: MoviedbService) {}

  ngOnInit() {}

  onSearch2(query: string | null = null) {
    if (!query) return; // Evita búsquedas vacías

    this.isLoading = true;
    this.moviedbService.search(query).subscribe(
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

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = null;
      return;
    }

    this.isLoading = true;
    this.moviedbService.search(this.searchQuery).subscribe(
      (results) => {
        this.searchResults = results;
        this.isLoading = false;
        console.log(results);
      },
      (error) => {
        console.error('Error al realizar la búsqueda:', error);
        this.isLoading = false;
      }
    );
  }

  openDetails(item: any) {
    this.router.navigate(['/tabs/details', item.media_type, item.id]);
  }
}
