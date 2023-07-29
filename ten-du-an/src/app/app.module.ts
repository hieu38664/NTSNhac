import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CallApiService } from './service/call-api.service';
import { UpdateComponent } from './update/update.component';
import { MultiDropdownComponent } from './multi-dropdown/multi-dropdown.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VideoComponent } from './video/video.component';
import { MenuService } from './service/menu.service';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';



// import { NgSelectModule } from '@ng-select/ng-select';


// import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// import { LabelModule } from '@progress/kendo-angular-label';
// import { DxButtonModule, DxDropDownBoxModule, DxTreeListModule } from 'devextreme-angular';
// import { CommonModule } from '@angular/common';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
// import { MatSelectModule } from '@angular/material/select';
// import { NTSDropDownComponent } from './nts-drop-down/nts-drop-down.component';

const routes: Routes = [
  { path: 'video', component: VideoComponent },
  // Add more routes for other components if needed
];


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent,
    MultiDropdownComponent,
    VideoComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    
    
    // MatSelectModule,


    // NgSelectModule,


    // MatFormFieldModule,
    // DropDownsModule,
    // LabelModule,
    // DxButtonModule,
    // DxDropDownBoxModule,
    // DxTreeListModule,
    // CommonModule,
    // NgxPaginationModule,
    // BrowserAnimationsModule,
    // MdbCheckboxModule,
    // MatSelectModule,
    // NgMultiSelectDroypDownModule.forRoot(),

  ],
  providers: [
    CallApiService,
    MenuService,
  ],

  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule {

}
