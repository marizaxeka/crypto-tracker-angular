import { MESSAGES_CONTAINER_ID } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { CurrencyService } from 'src/service/currency.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-coin-type-list',
  templateUrl: './coin-type-list.component.html',
  styleUrls: ['./coin-type-list.component.css']
})
export class CoinTypeListComponent implements OnInit {
  bannerData: any = [];
  currency : string = "INR"
  coinId:any
  // dataSource:any=[]
  editData:any
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable,{static:true})table:any = MatTable<any>;

  constructor(public dialog: MatDialog,private api: ApiService, private router : Router, private currencyService : CurrencyService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency()
    .subscribe((val: string)=>{
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    })
  }
  getBannerData() {
    this.api.getTrendingCurrency(this.currency)
      .subscribe((res: any) => {
        console.log(res);
        this.bannerData = res;
      })
  }

  getAllData() {
    this.api.getCurrency(this.currency)
      .subscribe((res: any[] | undefined) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-info',row.id])
  }
 
  deleteRowData(currency:any) {
    this.api.deleteCurrencyById(currency)
      .subscribe((res: any[] | undefined) => {
        this.getAllData()
      })
  }

  updateRowData(currency: any) {
    this.api.updateCurrencyById(currency).subscribe(result => {
      this.editData = result;
      if (this.editData != null) {
      console.log();
      }
    });
}


}