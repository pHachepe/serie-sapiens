import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserListsTabPage } from './user-lists-tab.page';

describe('UserListsTabPage', () => {
  let component: UserListsTabPage;
  let fixture: ComponentFixture<UserListsTabPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserListsTabPage],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
