import { Component, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallApiService } from '../service/call-api.service';
import { Item } from '../multi-dropdown/multi-dropdown.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})

export class AddComponent {
  // implements OnInit

  form: FormGroup;

  // data: Array<Object> = [];
  // fieldsvalues: Object | undefined;
  // selectmode: any;

  model:any;

  constructor(
    private activeModal: NgbActiveModal,
    private service: CallApiService,
    private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({});
    // this.data = [
    //     { text: "ListItem 1", value: "item1" },
    //     { text: "ListItem 2", value: "item2" },
    //     { text: "ListItem 3", value: "item3" },
    //     { text: "ListItem 4", value: "item4" },
    //     { text: "ListItem 5", value: "item5" }
    // ];
    // this.fieldsvalues = { dataSource: this.data, text: "text", value: "value" };
    // this.selectmode = ej.MultiSelectMode.VisualMode;
  }

  // public item: any = [];

  nhacModel: any = {
    thoigianPhat: '',
    noiDung: '',
    tinhTrang: false,
    ngay: '',
    fileId: '',
    tgian: Date.now,
  };

  // items: Item[] = [];
  // currentSelectedItem: Item = { id: null, name: '', uuid: '', };
  // showAll = true;

  // get checkedItems(): Item[] {
  //   return this.items.filter(i => i.checked);
  // }


  // ngOnInit(): void {
  //   this.items = this.service.getDayOfWeek().map(dayWeek => ({
  //     id: dayWeek.id,
  //     name: dayWeek.name
  //   } as Item));
  // }

  // onItemChange(item: Item): void {
  //   this.currentSelectedItem = item;
  // }



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

  listNgay: string[] = [];
  file: any;

  saveModel(tiep: boolean) {
    this.ListDayOfWeek.forEach(e => {
      if (e.checked) {
        this.listNgay.push(e.name);
      }
    });

    this.ListDayOfMonth.forEach(e => {
      if (e.checked) {
        this.listNgay.push(e.name);
      }
    });
    
    console.log(this.nhacModel);
    this.nhacModel.ngay = this.listNgay.join();
    this.service.createMusic(this.nhacModel).subscribe((data: any) => {
      if (!tiep) {
        this.closeModel(true);
      } else {
        alert("Lưu thành công!");
      }
    }
    );
  }

  uploadNhac(event: any): void {
    this.file = event.target.files[0];
    this.service.uploadMusic(this.file).subscribe(
      (response: any) => {
        this.nhacModel.fileId = response;
      },
      (error: any) => {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi thêm nhạc:', error);
      }
    );
  }

  selectedItems: string[] = []; // Mảng chứa các mục được chọn

  // Hàm xử lý khi người dùng chọn hoặc bỏ chọn một mục
  onItemChange(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
  }

  
  
  


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // public data: any[] = [
  //   { id: 1, name: 'Item 1', checked: false },
  //   { id: 2, name: 'Item 2', checked: false },
  //   { id: 3, name: 'Item 3', checked: false },
  // ];

  // public fields: any = { text: 'name', value: 'id', isChecked: 'checked' };

  // public onCheckBoxChange(event: any) {
  //   console.log(event.checkedItems);
  // }

  // selectall!: boolean;
  // languages = new FormControl();
  // languagesList: string[] = ['English', 'Spanish', 'Russian', 'Arabic','Mandarin Chinese','Malay','Bengali'];

  // selectalllang() {
  //   console.log('call',[this.selectall,this.languages]);
  //     if  (this.selectall === false) {
  //       this.languages = new FormControl();
  //       return;
  //     }else if (this.selectall === true) {
  //         this.languages = new FormControl();
  //         this.languages.setValue(this.languagesList);
  //     }
  //  }


  // title = "geeksforgeeks-multiSelect";
  
  // cars = [
  //   { id: 1, name: "BMW Hyundai" },
  //   { id: 2, name: "Kia Tata" },
  //   { id: 3, name: "Volkswagen Ford" },
  //   { id: 4, name: "Renault Audi" },
  //   { id: 5, name: "Mercedes Benz Skoda" },
  // ];
  
  // selected = [{ id: 3, name: "Volkswagen Ford" }];



}
