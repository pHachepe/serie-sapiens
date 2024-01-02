import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    const savedTheme = localStorage.getItem('isDarkMode');
    const isDarkMode = savedTheme !== null ? JSON.parse(savedTheme) : true;
    document.body.classList.toggle('dark', isDarkMode);
    if (Capacitor.isNativePlatform()) {
      await this.updateStatusBar(isDarkMode);
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
