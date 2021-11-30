import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';
import { NgxPaginationModule } from 'ngx-pagination';

import {HttpClientModule} from '@angular/common/http'
import { ApiserviceService } from './apiservice.service';
import { ExportService } from './read/services/export.service';
import { SortDirective } from './directive/sort.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiserviceService,
              ExportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
