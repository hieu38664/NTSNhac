import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Item } from './multi-dropdown.model';
import { v4 } from 'uuid';

@Component({
  selector: 'app-multi-dropdown',
  templateUrl: './multi-dropdown.component.html',
  styleUrls: ['./multi-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MultiDropdownComponent {

  _items: Item[] = [];

  // @Input() showSearch = true;
  // @Input() showError = false;
  @Input() placeholder!: string;
  @Input() showAll = true;
  @Input() showStatus = true;
  @Output() itemChange = new EventEmitter<Item>();

  @Input('items')
  set items(items: Item[]) {
    this._items = items;
    this._items.map(item => {
      item.uuid = item.uuid || v4();
      item.checked = item.checked || false;
      item.visible = item.visible || true;
    });
    this.filtered = [...this._items];

    if (!this.filtered.length) {
      this.all.visible = false;
    } else {
      this.all.visible = true;
    }
  }

  filtered: Item[] = [];
  all: Item = {
    id: null,
    name: 'All',
    uuid: v4(),
    checked: false,
    visible: true
  };

  get selected(): string {
    return this.all && this.all.checked ? this.all.name :
      this._items.filter(i => i.checked && i.visible).map(i => i.name).join(', ');
  }

  get isEmpty(): boolean {
    return this.filtered.filter(i => i.visible).length === 0;
  }

  get checked(): number {
    return this._items.filter(i => i.checked).length;
  }

  trackByUuid(index: number, item: Item): string {
    return item.uuid;
  }

  onChange($event: any, item: Item): void {
    const checked = $event.target.checked;
    const index = this._items.findIndex(i => i.id === item.id);

    if (item.id === null) {
      this.all.checked = checked;
      for (const iterator of this._items) {
        iterator.checked = checked;
      }
    } else {
      this._items[index].checked = checked;

      /* istanbul ignore else*/
      if (this.all) {
        /* istanbul ignore else*/
        if (this.all.checked) {
          this.all.checked = false;
        }
        const allChecked = this._items.filter(i => i.id !== null).every(i => i.checked);
        this.all.checked = allChecked;
      }
    }

    this.itemChange.emit(item);
  }

}
