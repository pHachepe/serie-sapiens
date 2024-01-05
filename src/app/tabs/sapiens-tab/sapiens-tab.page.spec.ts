import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SapiensTabPage } from './sapiens-tab.page';

describe('SapiensTabPage', () => {
  let component: SapiensTabPage;
  let fixture: ComponentFixture<SapiensTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SapiensTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
