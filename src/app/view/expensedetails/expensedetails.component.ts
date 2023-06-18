import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-expensedetails',
  templateUrl: './expensedetails.component.html',
  styleUrls: ['./expensedetails.component.css']
})
export class ExpensedetailsComponent implements OnInit {
  public vform:FormGroup;
  public vmform:FormGroup;
  submitted:boolean=false;
  vsubmitted:boolean=false;
  expensetypelist:any=[];
  expensedetaillist:any=[];
  allvehiclelist:any=[];
  pagesize:number=5;
  pageNumber:number=1;
  lastPage:number=1;
  expensetypeid:any;
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
     expensetypeid:[null,Validators.required],
     amount:['',Validators.required],
     chequeno:[''],
     paymentby:[null,Validators.required],
     expensedate:['',Validators.required],

    
     remark:[],
    
   })

  

 }

 addvehicle(){
   this.submitted=true;
   if(this.vform.valid && this.submitted)
   {
     this.apiservice.postapi('api/expense/addexpensedetails',this.vform.value).subscribe(resp=>{
       if(resp.status)
       {
 this.getallexpensedetailbyid(this.vform.value.expensetypeid);
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

     this.expensetypelist=resp.lstItems;
this.lastPage=resp.lstItems.length / this.pagesize;
if(this.pageNumber > this.lastPage){
 this.lastPage=this.pageNumber;
}
   })
 }

 

 edit(id:string)
 {
console.log(id);
const vehicle=this.expensedetaillist.filter((resp)=>{
 return resp.id===id;
});
this.vform.patchValue({

expensetypeid:vehicle[0].expensetypeid,
amount:vehicle[0].amount,
paymentby:vehicle[0].paymentby,
chequeno:vehicle[0].chequeno,
expensedate: this.formatDate(vehicle[0].expensedate),
remark: vehicle[0].remark,
id:id,
userid:localStorage.id
});
 }

 delete(id:string)
 {
   console.log(id);
   this.apiservice.postapi('api/expense/deleteexpensedetails?id='+id).subscribe(resp=>{
     if(resp.status)
     {
       this.toast.success(resp.message);
       this.getallexpensedetailbyid(this.expensetypeid);
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



getallexpensedetailbyid(id:string){
  this.apiservice.postapi('api/expense/allexpensedetaillistbyuseridandtypeid?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id+'&typeid='+id).subscribe(resp=>{
   this.expensetypeid=id;
    this.expensedetaillist=resp.lstItems;
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
 this.getexpensetypelist();  
}

prev()
{
 this.pageNumber--;
 this.pageNumber=this.pageNumber;
 this.getexpensetypelist();
}


keyPress(event: any) {
 
  const pattern = /[0-9\+\-\.\ ]/;
  let inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar) && event.charCode != '0') {
          event.preventDefault();
      }
}
private formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

}
