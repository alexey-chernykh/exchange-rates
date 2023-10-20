import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Convertion } from '../model/convertion/convertion';
import { Codes } from '../model/codes/codes';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiKey: string = "cca5c08c9dd7a62baea03220";
  apiUrl: string = "https://v6.exchangerate-api.com/v6/"+this.apiKey+"/pair/";
  apiGetCodesUrl: string = "https://v6.exchangerate-api.com/v6/"+this.apiKey+"/codes";
  constructor(private http: HttpClient) { }

  sendGetRequest = (from: string, to: string, amount: number): Observable<number> => {
    return this.http.get<Convertion>(this.apiUrl+from+'/'+to+'/'+amount).pipe(
      map((data:Convertion) => data.conversion_result)
    );
  }
  getAllCodes = () => {
    let codes: string[] = [];
    this.http.get<Codes>(this.apiGetCodesUrl).subscribe((data: Codes) => {
      for(let i = 0; i<data.supported_codes.length; i++){
        codes[i] = data.supported_codes[i][0];
      }
    });
    return codes;
  }
}
