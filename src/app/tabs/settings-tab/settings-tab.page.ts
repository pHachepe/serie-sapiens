import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-settings-tab',
  templateUrl: 'settings-tab.page.html',
})
export class SettingsTabPage implements OnInit {
  isDarkMode = true;
  isTextSizeLarge = false;
  isBoldTextEnabled = false;
  brightnessLevel = 100; // Default brightness level (0 to 100)
  fontSizeLevel = 16; // Default font size level (12 to 24)

  constructor() { }

  ngOnInit() {
    this.initializeSettings();
  }

  initializeSettings() {
    this.isDarkMode = this.getSettingFromLocalStorage('isDarkMode', this.isDarkMode);
    this.applyDarkMode(this.isDarkMode);

    this.isTextSizeLarge = this.getSettingFromLocalStorage('isTextSizeLarge', this.isTextSizeLarge);
    this.applyTextSize(this.isTextSizeLarge);

    this.isBoldTextEnabled = this.getSettingFromLocalStorage('isBoldTextEnabled', this.isBoldTextEnabled);
    this.applyBoldText(this.isBoldTextEnabled);

    this.brightnessLevel = this.getSettingFromLocalStorage('brightnessLevel', this.brightnessLevel);
    this.applyBrightness(this.brightnessLevel);

    this.fontSizeLevel = this.getSettingFromLocalStorage('fontSizeLevel', this.fontSizeLevel);
    this.applyFontSize(this.fontSizeLevel);
  }

  getSettingFromLocalStorage(settingKey: string, defaultValue: any): any {
    const savedSetting = localStorage.getItem(settingKey);
    return savedSetting !== null ? JSON.parse(savedSetting) : defaultValue;
  }

  applyDarkMode(isEnabled: boolean) {
    document.body.classList.toggle('dark', isEnabled);
    if (Capacitor.isNativePlatform()) {
      this.updateStatusBarStyle(isEnabled);
    }
  }

  applyTextSize(isLarge: boolean) {
    document.body.classList.toggle('text-size-large', isLarge);
  }

  applyBoldText(isEnabled: boolean) {
    document.body.classList.toggle('bold-text', isEnabled);
    document.querySelectorAll('ion-content').forEach((element) => {
      element.classList.toggle('bold-text', isEnabled);
    });
    document.querySelectorAll('.content').forEach((element) => {
      element.classList.toggle('bold-text', isEnabled);
    });
    document.querySelectorAll('span').forEach((element) => {
      element.classList.toggle('bold-text', isEnabled);
    });
    document.querySelectorAll('p').forEach((element) => {
      element.classList.toggle('bold-text', isEnabled);
    });
    document.querySelectorAll('ion-item').forEach((element) => {
      element.classList.toggle('bold-text', isEnabled);
    });
    document.querySelectorAll('ion-label').forEach((element) => {
      element.classList.toggle('bold-text', isEnabled);
    });
  }

  applyFontSize(size: number) {
    const minFontSize = 12;
    const maxFontSize = 24;
    const normalizedSize = Math.min(Math.max(size, minFontSize), maxFontSize);
    document.documentElement.style.setProperty('--text-base-size', `${normalizedSize}px`);
    this.saveSettingToLocalStorage('fontSizeLevel', normalizedSize);
  }

  applyBrightness(level: number) {
    const minBrightness = 40;
    const normalizedLevel = (level < minBrightness) ? minBrightness : level;
    const brightnessValue = normalizedLevel / 100;
    document.documentElement.style.setProperty('--app-brightness', `${brightnessValue}`);
  }

  async updateStatusBarStyle(isDarkMode: boolean) {
    try {
      await StatusBar.setStyle({
        style: isDarkMode ? Style.Dark : Style.Light,
      });
      await StatusBar.setBackgroundColor({
        color: isDarkMode ? '#000000' : '#ffffff',
      });
    } catch (e) {
      console.error('Error updating status bar style', e);
    }
  }

  onToggleDarkMode(changeEvent: Event) {
    this.isDarkMode = (changeEvent.target as HTMLInputElement).checked;
    this.saveSettingToLocalStorage('isDarkMode', this.isDarkMode);
    this.applyDarkMode(this.isDarkMode);
  }

  onToggleTextSize() {
    this.isTextSizeLarge = !this.isTextSizeLarge;
    this.saveSettingToLocalStorage('isTextSizeLarge', this.isTextSizeLarge);
    this.applyTextSize(this.isTextSizeLarge);
  }

  onToggleBoldText(changeEvent: Event) {
    this.isBoldTextEnabled = (changeEvent.target as HTMLInputElement).checked;
    this.saveSettingToLocalStorage('isBoldTextEnabled', this.isBoldTextEnabled);
    this.applyBoldText(this.isBoldTextEnabled);
  }

  onFontSizeChange(event: CustomEvent) {
    this.fontSizeLevel = event.detail.value;
    this.applyFontSize(this.fontSizeLevel);
  }

  onBrightnessChange(event: CustomEvent) {
    this.brightnessLevel = event.detail.value;
    this.saveSettingToLocalStorage('brightnessLevel', this.brightnessLevel);
    this.applyBrightness(this.brightnessLevel);
  }

  saveSettingToLocalStorage(settingKey: string, value: any) {
    localStorage.setItem(settingKey, JSON.stringify(value));
  }

  resetToDefaults() {
    // Define tus valores predeterminados
    this.isDarkMode = true;
    this.isTextSizeLarge = false;
    this.isBoldTextEnabled = false;
    this.brightnessLevel = 100;
    this.fontSizeLevel = 16;

    // Aplica y guarda los valores predeterminados
    this.applyDarkMode(this.isDarkMode);
    this.applyTextSize(this.isTextSizeLarge);
    this.applyBoldText(this.isBoldTextEnabled);
    this.applyBrightness(this.brightnessLevel);
    this.applyFontSize(this.fontSizeLevel);

    // Guarda en localStorage
    this.saveSettingToLocalStorage('isDarkMode', this.isDarkMode);
    this.saveSettingToLocalStorage('isTextSizeLarge', this.isTextSizeLarge);
    this.saveSettingToLocalStorage('isBoldTextEnabled', this.isBoldTextEnabled);
    this.saveSettingToLocalStorage('brightnessLevel', this.brightnessLevel);
    this.saveSettingToLocalStorage('fontSizeLevel', this.fontSizeLevel);
  }
}
