import { Component, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    // Nhận dữ liệu menu từ MenuService
    this.menuService.getMenuItemsObservable().subscribe((menuItems) => {
      this.menuItems = menuItems;
    });
  }
}
