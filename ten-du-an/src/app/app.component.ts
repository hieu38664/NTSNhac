import { Component, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { CallApiService } from './service/call-api.service';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';


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

  sidebarOn: boolean = true;

  model: any = {
    PageSize: 10,
    totalItems: 0,
    PageNumber: 1,
    keyword: this.keyword,
    // status: 0,
    type: 0
  }

  leftWidth: string = '250px';
  rightWidth: string = 'calc(100% - 260px)';

  toggleLeft() {
    if (this.leftWidth === '12%') {
      this.leftWidth = '0';
      this.rightWidth = '98%';
    } else {
      this.leftWidth = '250px';
      this.rightWidth = 'calc(100% - 260px)';
    }
  }

  sidebarClick(){
    // this.sidebarOn
    this.sidebarOn = !this.sidebarOn;
  }

  paginationMusic() {
    this.service.paginationMusic(this.model).subscribe((data: any) => {
      this.startIndex = ((this.model.PageNumber - 1) * this.model.PageSize + 1);
      this.model.totalItems = data.total;
      this.danhSachNhac = data.nhacInfors;
    });
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

  ngOnInit() {
    this.paginationMusic();
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

  

}
