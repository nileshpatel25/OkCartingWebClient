import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

const API_URL:string=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,
    private router:Router
    ) { }

    post(url:string,body?:any,headers?:HttpHeaders): Observable<any>{
       return this.http.post(API_URL+url,body,{headers:headers}).pipe(map((resp:any)=>{
             return resp;
       }       
      ),catchError(err => {
        console.log(err);
        return err;
    }))
      
   }

   get(url:string,headers?:HttpHeaders,params?:HttpParams): Observable<any>{
     return this.http.get(API_URL+url,{headers:headers,params}).pipe(map((resp:any)=>
{
return resp;
}
     ),catchError(err => {
      console.log(err);
      return err;
  }))
   }


   private handleSuccess(resp:any){
     if(!resp.status){

     }
     return resp;
   }
}
