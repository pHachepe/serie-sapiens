import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListsTabPage } from './user-lists-tab.page';

describe('UserListsTabPage', () => {
  let component: UserListsTabPage;
  let fixture: ComponentFixture<UserListsTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserListsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
