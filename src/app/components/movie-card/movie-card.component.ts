import { Component, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ResultDataService } from 'src/app/services/result-data.service';
import { Result } from 'src/app/models/result.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() result!: Result;

  constructor(
    private router: Router,
    private resultDataService: ResultDataService
  ) {}

  goToDetail() {
    this.resultDataService.setSelectedResult(this.result);
    this.router.navigate(['/resource-details', this.result.media_type, this.result.id]);
  }
}

@NgModule({
  declarations: [MovieCardComponent],
  imports: [IonicModule, CommonModule],
  exports: [MovieCardComponent],
})
export class MovieCardModule {}
