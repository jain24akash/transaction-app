import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { NgxPaginationModule } from 'ngx-pagination';

import {HttpClientModule} from '@angular/common/http'
import { ApiserviceService } from './apiservice.service';
import { SortDirective } from './directive/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
