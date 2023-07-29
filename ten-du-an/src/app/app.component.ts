import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { CallApiService } from './service/call-api.service';
import { UpdateComponent } from './update/update.component';
import { MenuService } from './service/menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None//Phải có dòng này thì mới nhận component.css
})

@Injectable({
  providedIn: 'root'
})

export class AppComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private service: CallApiService,
    private menuService: MenuService,
  ) {
  }

  
  danhSachNhac: any = [];
  total: number = 0;
  keyword: string = '';
  pageSize: number = 5;
  currentPage = 1;
  totalPages = 1;
  startIndex = 1;
  ListPageSize = [1, 3, 5, 10, 15, 20, 25, 30, 100];
  selectedOption = 'default';
  statusOptions = 'default';
  typeOptions = 'default';
  

  model: any = {
    PageSize: 10,
    totalItems: 0,
    PageNumber: 1,
    keyword: this.keyword,
    // status: 0,
    type: 0
  }
  
  menuItems = [
    { name: 'Nhạc', iconClass: 'las la-music', isActive: true, link: '#' },
    { name: 'Video', iconClass: 'las la-video', isActive: false, link: 'video' },
    { name: 'Hình ảnh', iconClass: 'las la-image', isActive: false, link: '#' },
    { name: 'abcxyz', iconClass: 'las la-angry', isActive: false, link: '#' },
    { name: 'abcxyz', iconClass: 'las la-grin', isActive: false, link: '#' },
    { name: 'abcxyz', iconClass: 'las la-sad-cry', isActive: false, link: '#' },
    { name: 'abcxyz', iconClass: 'las la-tired', isActive: false, link: '#' },
    { name: 'abcxyz', iconClass: 'las la-kiss', isActive: false, link: '#' },
    { name: 'abcxyz', iconClass: 'las la-award', isActive: false, link: '#' },
  ];

  darkMode = [
    { name: 'Dark mode', iconClass: 'las la-moon', isActive: true},
    { name: 'Light mode', iconClass: 'las la-sun', isActive: false },
  ];
  
  sidebarOn: any = true;
  leftWidth: string = '250px';
  rightWidth: string = 'calc(100% - 260px)';
  currentLink: string = '';
  
  sidebarClick() {
    this.sidebarOn = !this.sidebarOn;
    console.log(this.sidebarOn);
    if (this.sidebarOn === false) {
      this.leftWidth = '100px';
      this.rightWidth = 'calc(100% - 110px)';
    } else {
      this.leftWidth = '250px';
      this.rightWidth = 'calc(100% - 260px)';
    }
  }
  
  activateMenuItem(event: Event, item: any) {
    event.preventDefault(); 
    this.menuItems.forEach((menuItem) => {
      menuItem.isActive = menuItem === item;
    });
    this.currentLink = item.link;
  }

  
  paginationMusic() {
    this.service.paginationMusic(this.model).subscribe((data: any) => {
      this.startIndex = ((this.model.PageNumber - 1) * this.model.PageSize + 1);
      this.model.totalItems = data.total;
      this.danhSachNhac = data.nhacInfors;
    });
    this.menuService.setMenuItems(this.menuItems);
  }

  clear() {
    this.model = {
      PageSize: 10,
      totalItems: 0,
      PageNumber: 1,
      keyword: this.keyword,
      // status: 0,
      type: 0,
    }
    this.keyword = '';
    this.pageSize = 5;
    this.currentPage = 1;
    this.totalPages = 1;
    this.startIndex = 1;
    this.ListPageSize = [3, 5, 10, 15, 20, 25, 30, 100];
    this.selectedOption = 'default';
    this.statusOptions = 'default';
    this.typeOptions = 'default';
    this.paginationMusic();
  }

  ngOnInit():void {
    this.paginationMusic();
  }
  
  darkModeActive: boolean = false;

  toggleDarkMode() {
    this.darkModeActive = !this.darkModeActive;
    document.documentElement.setAttribute('data-theme', this.darkModeActive? "dark" : "light" );
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.paginationMusic();
    }
  }

  addModel() {
    let activeModal = this.modalService.open(AddComponent, {});
    // activeModal.componentInstance.ListVanDeDaChon = this.model.listVanDeDaChon;
    // activeModal.componentInstance.ListTen = this.listTenDaChon;
    activeModal.result.then((result) => {
      if (result === true) {
        this.paginationMusic();
      }
    }, (reason) => {
    });
  }

  deleteModel(id: string) {
    let activeModal = this.modalService.open(DeleteComponent, {});
    activeModal.result.then((result) => {
      if (result === true) {
        this.service.deleteMusic(id).subscribe((data) => {
          this.paginationMusic();
        })
      }
    }, (reason) => {

    })
  }

  updateModel(id: string) {
    let activeModal = this.modalService.open(UpdateComponent, {});
    activeModal.componentInstance.nhacId = id;
    activeModal.result.then((result) => {
      if (result === true) {
        this.paginationMusic();
      }
      this.paginationMusic();
    }, (reason) => {
    });
  }

  updateSearchOptions() {
    if (this.selectedOption === 'content') {
      this.model.type = 0;
      this.model.status = null;
      this.paginationMusic();
      return;
    }
    this.model.keyword = '';
    if (this.selectedOption === 'status') {
      this.model.type = 0;
      this.paginationMusic();
    } else if (this.selectedOption === 'type') {
      this.model.status = null;
      this.paginationMusic();
    }
  }

  changeStatus(event: any) {
    console.log('Selected status:', this.statusOptions);
    if (this.statusOptions == '1') {
      this.model.status = true;
      this.paginationMusic();
    } else if (this.statusOptions == '2') {
      this.model.status = false;
      this.paginationMusic();
    }
  }

  changeType(event: any) {
    console.log('Selected type:', this.typeOptions);
    if (this.typeOptions == '1') {
      this.model.type = '1';
      this.paginationMusic();
    } else if (this.typeOptions == '2') {
      this.model.type = '2';
      this.paginationMusic();
    } else if (this.typeOptions == '3') {
      this.model.type = '3';
      this.paginationMusic();
    }
  }

  // isDarkMode: boolean = false;

  // toggleDarkMode() {
  //   this.isDarkMode = !this.isDarkMode;
  //   this.applyDarkMode();
  // }

  // checkDarkMode() {
  //   const isDarkMode = localStorage.getItem('isDarkMode');
  //   this.isDarkMode = isDarkMode === 'true';
  //   this.applyDarkMode();
  // }

  // applyDarkMode() {
  //   if (this.isDarkMode) {
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     document.body.classList.remove('dark-mode');
  //   }
  //   localStorage.setItem('isDarkMode', String(this.isDarkMode));
  // }


}
