import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/result.model';
import { UserListService } from 'src/app/services/user-list/user-list.service';

@Component({
  selector: 'app-user-lists-tab',
  templateUrl: './user-lists-tab.page.html',
})
export class UserListsTabPage implements OnInit {
  pendingList$: Observable<Result[]> = this.userListService.getPendingListObservable();
  favoritesList$!: Observable<Result[]>;
  watchedList$!: Observable<Result[]>;

  constructor(private userListService: UserListService) {
    console.log("CONSTRUCTOR");
  }

  ngOnInit() {
    console.log("ON INIT");
    this.pendingList$ = this.userListService.getPendingListObservable();
    this.favoritesList$ = this.userListService.getFavoritesListObservable();
    this.watchedList$ = this.userListService.getWatchedListObservable();
  }
}
