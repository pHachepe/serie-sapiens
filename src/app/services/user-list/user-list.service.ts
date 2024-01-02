import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private userLists = {
    pending: new Set<number>(),
    favorites: new Set<number>(),
    watched: new Set<number>()
  };

  constructor() {
    this.loadLists();
  }

  private saveLists() {
    localStorage.setItem('userLists', JSON.stringify({
      pending: Array.from(this.userLists.pending),
      favorites: Array.from(this.userLists.favorites),
      watched: Array.from(this.userLists.watched)
    }));
  }

  private loadLists() {
    const savedData = localStorage.getItem('userLists');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.userLists = {
        pending: new Set(data.pending),
        favorites: new Set(data.favorites),
        watched: new Set(data.watched)
      };
    }
  }

  isInList(list: 'pending' | 'favorites' | 'watched', id: number): boolean {
    return this.userLists[list].has(id);
  }

  toggleItemInList(list: 'pending' | 'favorites' | 'watched', id: number) {
    const itemList = this.userLists[list];
    if (itemList.has(id)) {
      itemList.delete(id);
    } else {
      itemList.add(id);
    }
    this.saveLists();
  }
}
