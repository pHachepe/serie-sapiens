import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentTabService {
  private currentTab: string = '';

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  getCurrentTab(): string {
    return this.currentTab;
  }
}
