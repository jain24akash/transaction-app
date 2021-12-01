import { Component, HostListener, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import { ExportService } from './services/export.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: ApiserviceService, private exportService: ExportService, private router: Router) { }

  readData: any;
  config: any;
  collection = { count: 0, data: [] };
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  ngOnInit(): void {
    this.service.getAllTransactions(this.service.walletId).subscribe((res)=> {
      // console.log(res, "result-->");
      this.readData = res;
      this.collection.count = this.readData.length;
      this.collection.data = this.readData;
      
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
      // console.log(this.config);
    })
  }
  pageChanged(event: any){
    this.config.currentPage = event;
  }

  /**
   * Funtion prepares data to pass to export service to create csv from Json
   *
   */
  exportToCsv(): void {
    this.exportService.downloadFile(this.readData, 'transaction-data', ['_id', 'walletId', 'amount', 'balance', 'description', 'type', 'date']);
  }

}
