import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from 'src/app/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private userLists = {
    pending: new Map<number, Result>(),
    favorites: new Map<number, Result>(),
    watched: new Map<number, Result>()
  };

  private pendingSubject = new BehaviorSubject<Result[]>([]);
  private favoritesSubject = new BehaviorSubject<Result[]>([]);
  private watchedSubject = new BehaviorSubject<Result[]>([]);

  constructor() {
    this.loadLists();
  }

  private saveLists() {
    const serializeMap = (map: Map<number, Result>) => Array.from(map.values());

    localStorage.setItem('userLists', JSON.stringify({
      pending: serializeMap(this.userLists.pending),
      favorites: serializeMap(this.userLists.favorites),
      watched: serializeMap(this.userLists.watched)
    }));
  }

  private loadLists() {
    const savedData = localStorage.getItem('userLists');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.userLists = {
        pending: new Map(data.pending.map((item: Result) => [item.id, item])),
        favorites: new Map(data.favorites.map((item: Result) => [item.id, item])),
        watched: new Map(data.watched.map((item: Result) => [item.id, item]))
      };
    }
    this.updateSubjects();
  }

  private updateSubjects() {
    this.pendingSubject.next(Array.from(this.userLists.pending.values()));
    this.favoritesSubject.next(Array.from(this.userLists.favorites.values()));
    this.watchedSubject.next(Array.from(this.userLists.watched.values()));
  }

  isInList(list: 'pending' | 'favorites' | 'watched', id: number): boolean {
    return this.userLists[list].has(id);
  }

  toggleItemInList(list: 'pending' | 'favorites' | 'watched', result: Result) {
    const itemList = this.userLists[list];
    if (itemList.has(result.id)) {
      itemList.delete(result.id);
    } else {
      itemList.set(result.id, result);
    }
    this.saveLists();
    this.updateSubject(list);
  }

  private updateSubject(list: 'pending' | 'favorites' | 'watched') {
    switch (list) {
      case 'pending':
        this.pendingSubject.next(Array.from(this.userLists.pending.values()));
        break;
      case 'favorites':
        this.favoritesSubject.next(Array.from(this.userLists.favorites.values()));
        break;
      case 'watched':
        this.watchedSubject.next(Array.from(this.userLists.watched.values()));
        break;
    }
  }

  getPendingListObservable() {
    return this.pendingSubject.asObservable();
  }

  getFavoritesListObservable() {
    return this.favoritesSubject.asObservable();
  }

  getWatchedListObservable() {
    return this.watchedSubject.asObservable();
  }
}
