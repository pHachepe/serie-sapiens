import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopSwiperComponent } from './top-swiper.component';

describe('TopSwiperComponent', () => {
  let component: TopSwiperComponent;
  let fixture: ComponentFixture<TopSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopSwiperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSwiperComponent);
    component = fixture.componentInstance;
    component.items = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
