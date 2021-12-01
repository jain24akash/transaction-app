import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from './apiservice.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit {
//   
// }

export class AppComponent implements OnInit {
  title = 'my-angular-app';

  constructor(private service: ApiserviceService) { }

  walletData :any;
  numWallets = 1;
  public walletId : any;
  credit: boolean = true;
  walletInfo = {
    name: null,
    balance: 0
  };
  hideHomePage = false;
  loading = true;
  type: string = 'CREDIT';


  ngOnInit() {
    if(!this.walletId){
      this.loading = true;
      this.credit = true;
      this.type = 'CREDIT';
      this.service.getAllWallets().subscribe((res)=>{
        this.loading = false;
        // console.log(res, 'wallets');
        this.walletData = res;
        this.numWallets = res.length;
        if(res.length > 0){
          this.walletId = res[0]._id;
          this.service.walletId = this.walletId;
          this.walletInfo.name = res[0].name;
          this.walletInfo.balance = res[0].balance;
          // console.log(`Wallet ID--->${this.walletId}`);
        }
      })
    }
    
  }

  userForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'balance': new FormControl('', Validators.required)
  });

  formTransaction = new FormGroup({
    'amount': new FormControl('', Validators.required),
    'description': new FormControl('')
  })

  createWallet(){
    this.service.createWallet({name: this.userForm.value.name, balance: this.userForm.value.balance}).subscribe((res)=>{
      this.walletId = res._id;
      this.service.walletId = this.walletId;
      //console.log(`Wallet ID--->${this.walletId}`);
      this.userForm.reset();
      location.reload();
    });

  }

  switchClicked(event:any){
    this.credit = event.srcElement.checked;
    this.type = this.credit ? 'CREDIT' : 'DEBIT';
    // console.log(`credit is ${this.credit}`);
  }

  createTransaction(){
    const tr = {
      amount: this.formTransaction.value.amount,
      description: this.formTransaction.value.description,
      type: this.credit ? 'CREDIT' : 'DEBIT'
    };
    if(!this.credit){
      tr.amount = -1 * Math.abs(tr.amount);
    }else{
      tr.amount = Math.abs(tr.amount);
    }
    this.service.createTransaction({amount: tr.amount, description: tr.description}, this.walletId).subscribe((res)=>{
      // console.log(`Transaction ID--->${res}`);
      this.walletInfo.balance = res.balance;
      this.formTransaction.reset();
      // location.reload();
    });

  }
  hideHome(){
    this.hideHomePage = true;
    this.credit = true;
    this.type = 'CREDIT';
  }

  unhideHome(){
    this.hideHomePage = false;
  }

}

