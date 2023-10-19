import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiKey = "cca5c08c9dd7a62baea03220";
  apiUrl = "https://v6.exchangerate-api.com/v6/"+this.apiKey+"/pair/";
  apiGetCodesUrl = "https://v6.exchangerate-api.com/v6/"+this.apiKey+"/codes";
  constructor(private http: HttpClient) { }

  sendGetRequest = (from: string, to: string, amount: string): Observable<any> => {
    return this.http.get(this.apiUrl+from+'/'+to+'/'+amount).pipe(
      map((data:any) =>{ return data.conversion_result } )
    );
  }
  getAllCodes = () => {
    let codes: string[] = [];
    this.http.get(this.apiGetCodesUrl).subscribe((data: any) => {
      for(let i = 0; i<data.supported_codes.length; i++){
        codes[i] = data.supported_codes[i][0];
      }
    });
    return codes;
  }
}
