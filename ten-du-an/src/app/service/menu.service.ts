import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSubject = new BehaviorSubject<any[]>([]);

  getMenuItemsObservable() {
    return this.menuItemsSubject.asObservable();
  }

  setMenuItems(menuItems: any[]) {
    this.menuItemsSubject.next(menuItems);
  }
}
