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
  currResult:any;
  
  constructor(private service: HttpService, private http: HttpClient){
  }
  
  ngOnInit(): void{
    this.currs = this.service.getAllCodes();
  }

  onDropdown1Click = (event:any) => {
    this.currFrom = event.target.innerText;
  }
  onDropdown2Click = (event:any) => {
    this.currTo = event.target.innerText;
  }
  onCurrInput = (event:any) => {
    this.currAmount = event.target.value;
  }

  onBtnSubmit = () => {
    this.currResult = this.service.sendGetRequest(this.currFrom, this.currTo, this.currAmount).subscribe((result) => {
      this.currResult = result;
    });
  }
}
