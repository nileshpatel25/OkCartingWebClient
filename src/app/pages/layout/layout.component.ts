import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/shared/app.service';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  name:any;
  role:any;
  compnayname:any;
  constructor(private appservice:AppService,private apiservice: ApiService) { }
  
  get isAdmin() {
    return localStorage.role === "Admin";
}
  ngOnInit(): void {
    this.name=localStorage.Name;
    this.role=localStorage.role;
    console.log(this.name);
    this.getuserinfo();
  }

  getuserinfo()
  {
    this.apiservice.postapi('api/cartingregistartion/getUserinfo?id='+localStorage.id).subscribe(resp=>{
const user = resp.lstItems;

this.compnayname=user[0].compnayname;
    })}


  logout(){
this.appservice.logout();
  }
 
}
