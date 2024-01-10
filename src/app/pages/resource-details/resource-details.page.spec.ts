import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { UserListService } from 'src/app/services/user-list/user-list.service';
import { ResourceDetailsPage } from './resource-details.page';

class MockActivatedRoute {
  public paramMap = of(new Map<string, string>());
}

class MockMoviedbService {
  // Métodos mock según sean requeridos
}

class MockUserListService {
  // Métodos mock según sean requeridos
}

describe('ResourceDetailsPage', () => {
  let component: ResourceDetailsPage;
  let fixture: ComponentFixture<ResourceDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceDetailsPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: MoviedbService, useClass: MockMoviedbService },
        { provide: UserListService, useClass: MockUserListService },
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
