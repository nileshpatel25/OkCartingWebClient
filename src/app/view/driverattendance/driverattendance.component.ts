import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-driverattendance',
  templateUrl: './driverattendance.component.html',
  styleUrls: ['./driverattendance.component.css']
})
export class DriverattendanceComponent implements OnInit {
  driverlist:any=[];
  pagesize:number=50;
  pageNumber:number=1;
  lastPage:number=1;
  aform:FormGroup;
  constructor( private apiservice:ApiService,
    private appservice:AppService,
    private fb:FormBuilder,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.appservice.checktoken();
this.getalldriverlist();
this.aform=this.fb.group({
id:'0',
userid:[localStorage.id],
driverid:['',Validators.required],
dtattencanceDate:['',Validators.required],
status:['',Validators.required]

});
  }

  
  getalldriverlist()
  {
    this.apiservice.postapi('api/driverattendance/alldriverattendancedetailsbyuserid?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
      this.driverlist=resp.lstItems;
      this.lastPage=resp.lstItems.length/this.pagesize;
      if(this.pageNumber > this.lastPage){
        this.lastPage=this.pageNumber;
      }
    })
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
