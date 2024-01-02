import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TrendingTabPage } from './trending-tab.page';

describe('TrendingTabPage', () => {
  let component: TrendingTabPage;
  let fixture: ComponentFixture<TrendingTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingTabPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
