import { Injectable } from '@angular/core';
import { HttpService} from './http.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpService
  ) { }
  postapi(apiname,payload?:any|null,header?:any|null){
    return this.http.post(apiname,payload,header);
  }
  getapi(apiname,header?:any|null,params?:any|null){
    return this.http.get(apiname,header,params);
  }
}
