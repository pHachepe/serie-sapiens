import { Component } from '@angular/core';
import { CurrentTabService } from '../services/current-tab.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
})
export class TabsPage {
  constructor(private currentTabService: CurrentTabService) {}

  onTabsChange(tabName: string) {
    this.currentTabService.setCurrentTab(tabName);
  }
}
