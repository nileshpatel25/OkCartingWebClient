import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-driversalarylist',
  templateUrl: './driversalarylist.component.html',
  styleUrls: ['./driversalarylist.component.css']
})
export class DriversalarylistComponent implements OnInit {
  driversalaryllist:any=[];
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
this.getalldriversalarylist();
 }

 getalldriversalarylist()
 {
   this.apiservice.postapi('api/driversalary/alldriverSalarydetailsbyuserid?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
     this.driversalaryllist=resp.lstItems;
     this.lastPage=resp.lstItems.length/this.pagesize;
     if(this.pageNumber > this.lastPage){
       this.lastPage=this.pageNumber;
     }
   })
 }
 

 delete(id:string){
this.apiservice.postapi('api/driversalary/deletedriversalary?id='+id).subscribe(resp=>{
if(resp.status)
{
this.getalldriversalarylist();
this.toastr.success(resp.message);
}
});
 }
 next()
 {
   this.pageNumber++;
   this.pageNumber=this.pageNumber;
   this.getalldriversalarylist();  
 }
 
 prev()
 {
   this.pageNumber--;
   this.pageNumber=this.pageNumber;
   this.getalldriversalarylist();
 }
}
