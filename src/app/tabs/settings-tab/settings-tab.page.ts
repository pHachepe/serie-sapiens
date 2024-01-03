import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-settings-tab',
  templateUrl: 'settings-tab.page.html',
})
export class SettingsTabPage {
  themeToggle = false;

  constructor() {
    this.checkInitialTheme();
  }

  checkInitialTheme() {
    const savedTheme = localStorage.getItem('isDarkMode');
    this.themeToggle = savedTheme !== null ? JSON.parse(savedTheme) : true;
  }

  async toggleChange(ev: { detail: { checked: boolean } }) {
    document.body.classList.toggle('dark', ev.detail.checked);
    localStorage.setItem('isDarkMode', JSON.stringify(ev.detail.checked));
    if (Capacitor.isNativePlatform()) {
      await this.updateStatusBar(ev.detail.checked);
    }
  }

  private async updateStatusBar(isDarkMode: boolean) {
    try {
      if (isDarkMode) {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#000000' });
      } else {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
