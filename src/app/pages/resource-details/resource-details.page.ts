import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultDataService } from 'src/app/services/result-data.service';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { Result } from 'src/app/models/result.model';
import { switchMap } from 'rxjs/operators';
import { MediaType } from 'src/app/models/media-types.model';

@Component({
  selector: 'app-resource-details',
  templateUrl: 'resource-details.page.html',
})
export class ResourceDetailsPage implements OnInit {
  resultDetails: Result | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private resultDataService: ResultDataService,
    private moviedbService: MoviedbService
  ) {}

  ngOnInit() {
    const resultFromService = this.resultDataService.getSelectedResult();
    if (resultFromService) {
      this.resultDetails = resultFromService;
      console.log('Result from service', resultFromService);
    } else {
      this.activatedRoute.paramMap
        .pipe(
          switchMap((params) => {
            const id = params.get('id');
            const media_type = params.get('media_type') as MediaType;

            if (id && media_type) {
              return this.moviedbService.getDetails(Number(id), media_type);
            } else {
              console.error('ID no proporcionado');
              return [];
            }
          })
        )
        .subscribe((result) => {
          this.resultDetails = result;
        });
    }
  }
}
