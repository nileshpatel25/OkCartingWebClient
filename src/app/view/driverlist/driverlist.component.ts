import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-driverlist',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driverlist.component.css']
})
export class DriverlistComponent implements OnInit {
  
   driverlist:any=[];
   pagesize:number=5;
   pageNumber:number=1;
   lastPage:number=1;
  constructor(
    private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
this.appservice.checktoken();
this.getalldriverlist();
  }

  getalldriverlist()
  {
    this.apiservice.postapi('api/driver/alldriverbyuser?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
      this.driverlist=resp.lstItems;
      this.lastPage=resp.lstItems.length/this.pagesize;
      if(this.pageNumber > this.lastPage){
        this.lastPage=this.pageNumber;
      }
    })
  }
  

  delete(id:string){
this.apiservice.postapi('api/driver/deletedriver?id='+id).subscribe(resp=>{
if(resp.status)
{
this.getalldriverlist();
this.toastr.success(resp.message);
}
});
  }
  next()
  {
    this.pageNumber++;
    this.pageNumber=this.pageNumber;
    this.getalldriverlist();  
  }
  
  prev()
  {
    this.pageNumber--;
    this.pageNumber=this.pageNumber;
    this.getalldriverlist();
  }
}
