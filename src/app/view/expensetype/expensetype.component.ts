import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-expensetype',
  templateUrl: './expensetype.component.html',
  styleUrls: ['./expensetype.component.css']
})
export class ExpensetypeComponent implements OnInit {
  public vform:FormGroup;
  public vmform:FormGroup;
  submitted:boolean=false;
  vsubmitted:boolean=false;
  vehiclelist:any=[];
  allvehiclelist:any=[];
  pagesize:number=5;
  pageNumber:number=1;
  lastPage:number=1;
  public vehiclemask=[/[a-z]{2}/,/[0-9]{2}/,/[a-z]{1,2}/,/[0-9]{4}/];
  public mask = [ /[A-Z]/,/[A-Z]/, /\d/, /\d/, /[A-Z]/, /[A-Z]/, /\d/, /\d/, /\d/, /\d/];
 constructor(
   private apiservice:ApiService,
   private toast: ToastrService,
   private appservice: AppService,
   private fb:FormBuilder
 ) { }

 ngOnInit(): void {

   this.appservice.checktoken();

   this.getexpensetypelist();
   this.vform=this.fb.group({
     id:['0'],
     userid:[localStorage.id],
     name:[null,Validators.required],
     remark:[],
    
   })

  

 }

 addvehicle(){
   this.submitted=true;
   if(this.vform.valid && this.submitted)
   {
     this.apiservice.postapi('api/expense/addexpensetype',this.vform.value).subscribe(resp=>{
       if(resp.status)
       {
 this.getexpensetypelist();
 this.toast.success(resp.message);
 this.reset();
 
//   this.vform.reset({
//     id:'0',
//     userid:localStorage.id,
// vehiclename:null,
// vehiclenumber:null,
// perhourrate:null
//   });
}
else{
 this.toast.error(resp.message);
}
     });

   }
 }


 getexpensetypelist()
 {
   this.apiservice.postapi('api/expense/allexpensetypelistbyuserid?userid='+localStorage.id).subscribe(resp=>{

     this.vehiclelist=resp.lstItems;
this.lastPage=resp.lstItems.length / this.pagesize;
if(this.pageNumber > this.lastPage){
 this.lastPage=this.pageNumber;
}
   })
 }

 edit(id:string)
 {
console.log(id);
const vehicle=this.vehiclelist.filter((resp)=>{
 return resp.id===id;
});
this.vform.patchValue({
name:vehicle[0].name,
remark: vehicle[0].remark,
id:id,
userid:localStorage.id
});
 }

 delete(id:string)
 {
   console.log(id);
   this.apiservice.postapi('api/expense/deleteexpensetype?id='+id).subscribe(resp=>{
     if(resp.status)
     {
       this.toast.success(resp.message);
       this.getexpensetypelist();
     }
   })
 }
reset()
{
 

 
 this.submitted=false;
 this.vform.reset({
      id:'0',
      userid:localStorage.id,
  name:null,
  remark:null
    });
 
}











next()
{
 this.pageNumber++;
 this.pageNumber=this.pageNumber;
 this.getexpensetypelist();  
}

prev()
{
 this.pageNumber--;
 this.pageNumber=this.pageNumber;
 this.getexpensetypelist();
}




}
