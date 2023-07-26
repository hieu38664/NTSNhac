import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent {

  constructor(private activeModal: NgbActiveModal,) { }

  nhac: any = [];

  
  deleteNhac() {
    this.activeModal.close(true);
  }


  closeModel() {
    this.activeModal.close(false);
  }

}

