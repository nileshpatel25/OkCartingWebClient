import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-fule-details',
  templateUrl: './fule-details.component.html',
  styleUrls: ['./fule-details.component.css']
})
export class FuleDetailsComponent implements OnInit {
  fuellist:any=[];
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
this.getallfuellist();
 }

 getallfuellist()
 {
   this.apiservice.postapi('api/fuel/allfuellistbyuseridwithpagging?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
     this.fuellist=resp.lstItems;
     this.lastPage=resp.lstItems.length/this.pagesize;
     if(this.pageNumber > this.lastPage){
       this.lastPage=this.pageNumber;
     }
   })
 }
 

 delete(id:string){
this.apiservice.postapi('api/fuel/deletefuelmaster?id='+id).subscribe(resp=>{
if(resp.status)
{
this.getallfuellist();
this.toastr.success(resp.message);
}
});
 }
 next()
 {
   this.pageNumber++;
   this.pageNumber=this.pageNumber;
   this.getallfuellist();  
 }
 
 prev()
 {
   this.pageNumber--;
   this.pageNumber=this.pageNumber;
   this.getallfuellist();
 }
}
