import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { MoviedbService } from '../../api/moviedb.service';
import { TrendingTabPage } from './trending-tab.page';

class MockMoviedbService {
  getTrendingMovies() {
    return of({ results: [] });
  }
  getPopularMovies() {
    return of({ results: [] });
  }
  getTrendingSeries() {
    return of({ results: [] });
  }
  getPopularSeries() {
    return of({ results: [] });
  }
  getPopularDocumentaries() {
    return of({ results: [] });
  }
  getTopRatedMovies() {
    return of({ results: [] });
  }
  getTopRatedSeries() {
    return of({ results: [] });
  }
  getTopRatedDocumentaries() {
    return of({ results: [] });
  }
}

describe('TrendingTabPage', () => {
  let component: TrendingTabPage;
  let fixture: ComponentFixture<TrendingTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingTabPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: MoviedbService, useClass: MockMoviedbService },
        {
          provide: LoadingController,
          useValue: {
            create: () =>
              Promise.resolve({
                present: () => Promise.resolve(),
                dismiss: () => Promise.resolve(),
              }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
