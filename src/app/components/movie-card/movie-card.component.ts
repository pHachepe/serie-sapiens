import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Result } from 'src/app/models/result.model';
import { CurrentTabService } from 'src/app/services/current-tab.service';
import { ResultDataService } from 'src/app/services/result-data/result-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() result!: Result;

  constructor(
    private navCtrl: NavController,
    private currentTabService: CurrentTabService,
    private resultDataService: ResultDataService
  ) { }

  goToDetail() {
    this.resultDataService.setSelectedResult(this.result);
    const currentTab = this.currentTabService.getCurrentTab();
    this.navCtrl.navigateForward([`/tabs/${currentTab}/details`, this.result.media_type, this.result.id]);
  }
}

@NgModule({
  declarations: [MovieCardComponent],
  imports: [IonicModule, CommonModule],
  exports: [MovieCardComponent],
})
export class MovieCardModule { }
