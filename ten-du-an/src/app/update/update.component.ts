import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallApiService } from '../service/call-api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class UpdateComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private service: CallApiService,) {
    this.nhacModel = {}
  }
  nhacId: any;
  nhacModel: any = {};

  ListDayOfWeek: any[] = [
    { id: 2, name: '2', checked: false },
    { id: 3, name: '3', checked: false },
    { id: 4, name: '4', checked: false },
    { id: 5, name: '5', checked: false },
    { id: 6, name: '6', checked: false },
    { id: 7, name: '7', checked: false },
  ]

  ListDayOfMonth: any[] = [
    { id: 1, name: '1', checked: false },
    { id: 2, name: '2', checked: false },
    { id: 3, name: '3', checked: false },
    { id: 4, name: '4', checked: false },
    { id: 5, name: '5', checked: false },
    { id: 6, name: '6', checked: false },
    { id: 7, name: '7', checked: false },
    { id: 8, name: '8', checked: false },
    { id: 9, name: '9', checked: false },
    { id: 10, name: '10', checked: false },
    { id: 11, name: '11', checked: false },
    { id: 12, name: '12', checked: false },
    { id: 13, name: '13', checked: false },
    { id: 14, name: '14', checked: false },
    { id: 15, name: '15', checked: false },
    { id: 16, name: '16', checked: false },
    { id: 17, name: '17', checked: false },
    { id: 18, name: '18', checked: false },
    { id: 19, name: '19', checked: false },
    { id: 20, name: '20', checked: false },
    { id: 21, name: '21', checked: false },
    { id: 22, name: '22', checked: false },
    { id: 23, name: '23', checked: false },
    { id: 24, name: '24', checked: false },
    { id: 25, name: '25', checked: false },
    { id: 26, name: '26', checked: false },
    { id: 27, name: '27', checked: false },
    { id: 28, name: '28', checked: false },
    { id: 29, name: '29', checked: false },
    { id: 30, name: '30', checked: false },
    { id: 31, name: '31', checked: false },
  ]

  ListMonthOfYear: any[] = [
    { id: 1, name: '1', checked: false },
    { id: 2, name: '2', checked: false },
    { id: 3, name: '3', checked: false },
    { id: 4, name: '4', checked: false },
    { id: 5, name: '5', checked: false },
    { id: 6, name: '6', checked: false },
    { id: 7, name: '7', checked: false },
    { id: 8, name: '8', checked: false },
    { id: 9, name: '9', checked: false },
    { id: 10, name: '10', checked: false },
    { id: 11, name: '11', checked: false },
    { id: 12, name: '12', checked: false },
  ]

  closeModel(F: boolean) {
    this.activeModal.close(F);
  }

  changeType(type: number) {
    this.nhacModel.type = type;
  }

  changeStatus(isStatus: boolean) {
    this.nhacModel.tinhTrang = isStatus;
  }

  ngOnInit() {
    this.getNhacDetail();
  }

  

  getNhacDetail() {
    this.service.getNhacById(this.nhacId).subscribe((data: any) => {
      this.nhacModel = data;
      console.log(this.nhacModel);
      if (this.nhacModel.type != 1) {
        const selectedDays = this.nhacModel.ngay.split(",").map((ngaychon: any) => parseInt(ngaychon));
        this.ListDayOfWeek.forEach((day) => {
          day.checked = selectedDays.includes(day.id);
        });
        console.log(this.ListDayOfWeek);
      }
    });
  }

  saveModel() {
    if (this.nhacModel.type != 1) {
      console.log(this.nhacModel);
      var selectedDays = this.ListDayOfWeek.filter(as => as.checked == true)
      var selectedDayNames = selectedDays.map(day => day.name);
      this.nhacModel = selectedDayNames.join(',');
      console.log(selectedDayNames);
    }
    this.service.updateMusic(this.nhacModel).subscribe((data: any) => {

    });
    this.closeModel(true);
  }

}
