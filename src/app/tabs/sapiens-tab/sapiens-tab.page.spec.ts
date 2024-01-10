import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GptApiService } from 'src/app/api/gpt-api.service';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { SapiensTabPage } from './sapiens-tab.page';

class MockGptApiService {
  getApiResponseChatGPTtopicFromServer(topic: string) {
    return of([]);
  }
}

class MockMoviedbService {
  search(query: string) {
    return of({ results: [] });
  }
}

describe('SapiensTabPage', () => {
  let component: SapiensTabPage;
  let fixture: ComponentFixture<SapiensTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SapiensTabPage],
      providers: [
        { provide: GptApiService, useClass: MockGptApiService },
        { provide: MoviedbService, useClass: MockMoviedbService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapiensTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
