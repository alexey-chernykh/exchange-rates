import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency Converter';
  currs: string[] = [];
  currFrom = "";
  currTo = "";
  currAmount = "";
  curr1:any;
  curr2:any;
  usdToUah: any;
  eurToUah: any;

  constructor(private service: HttpService, private http: HttpClient){
  }
  
  ngOnInit(): void{
    this.currs = this.service.getAllCodes();
    this.eurToUah = this.service.sendGetRequest("EUR", "UAH", "1").subscribe((result) => {
      this.eurToUah = result;
    });
    this.usdToUah = this.service.sendGetRequest("USD", "UAH", "1").subscribe((result) => {
      this.usdToUah = result;
    });
  }

  onDropdown1Click = (event:any) => {
    this.currFrom = event.target.innerText;
  }
  onDropdown2Click = (event:any) => {
    this.currTo = event.target.innerText;
  }
  onCurr1Input = (event:any) => {
    this.curr1 = event.target.value;
    this.currAmount = this.curr1;
    this.ExchangeRate(1);
  }
  onCurr2Input = (event:any) => {
    this.curr2 = event.target.value;
    this.currAmount = this.curr2;
    this.ExchangeRate(2);
  }

  ExchangeRate = (state:number) => {
    if(state == 1){
      this.curr2 = this.service.sendGetRequest(this.currFrom, this.currTo, this.currAmount).subscribe((result) => {
        this.curr2 = result;
      });
    } else {
      this.curr1 = this.service.sendGetRequest(this.currFrom, this.currTo, this.currAmount).subscribe((result) => {
        this.curr1 = result;
      });
    }
    
  }
}
