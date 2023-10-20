import { Component } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//TOLEARN -TODO: custom form elements using ControlValueAccessor, control over changing values using reactive forms.  

export class AppComponent {
  title: string = 'Currency Converter';
  currencies: string[] = [];
  currencyFrom: string = "";
  currencyTo: string = "";
  inputValue1:number = 0;
  inputValue2:number = 0;
  usdToUah: number = 0;
  eurToUah: number = 0;

  constructor(private service: HttpService, private http: HttpClient){
  }
  
  ngOnInit(): void{
    this.currencies = this.service.getAllCodes();
    this.fillHeaderRates();
  }
  getRequest = (from: string, to: string, amount: number) => {
    return this.service.sendGetRequest(from, to, amount);
  }
  fillHeaderRates = () => {
    this.getRequest("EUR", "UAH", 1).subscribe((result) => {
      this.eurToUah = result;
    });
    this.getRequest("USD", "UAH", 1).subscribe((result) => {
      this.usdToUah = result;
    });
  }

  onDropdown1Click = (event:MouseEvent) => {
    this.currencyFrom = (event.target as HTMLElement).innerText;
  }
  onDropdown2Click = (event:MouseEvent) => {
    this.currencyTo = (event.target as HTMLElement).innerText;
  }
  oninputValue1Input = (event:Event) => {
    this.inputValue1 = +(event.target as HTMLInputElement).value;
    this.ExchangeRate(1);
  }
  oninputValue2Input = (event:Event) => {
    this.inputValue2 = +(event.target as HTMLInputElement).value;
    this.ExchangeRate(2);
  }

  ExchangeRate = (state:number) => {
      this.getRequest(this.currencyFrom, this.currencyTo, this.inputValue1).subscribe((result) => {
        state == 1 ? (this.inputValue2 = result) : (this.inputValue1 = result);
      });
  }
}
