import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabTrendingPage } from './tab-trending.page';

describe('TabTrendingPage', () => {
  let component: TabTrendingPage;
  let fixture: ComponentFixture<TabTrendingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabTrendingPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTrendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
