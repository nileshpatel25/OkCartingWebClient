import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import * as $ from 'jquery' 
import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  submitted:boolean=false;
  pform:FormGroup;
  
  driverlist:any=[];
  jobworklist:any=[];
  custpaymentlist:any=[];
  id:any;
  isChecked = false;
  readonly:boolean =true;
totalrow:number;
  constructor(private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getdriverlist();
   this.pform= this.fb.group({
    id:['0'],
    userid:[localStorage.id],
    customerid:['',Validators.required],
    jobworkid:['',Validators.required],
    paymenttype:['Received'],
    paymentby:['select',Validators.required],
    chequeno:[''],
    paymentdate:['',Validators.required],
    amount:['',Validators.required],
    remark:['']
   });
  }
  getdriverlist(){
    this.apiservice.postapi('api/customer/allcustomerslistbyuser?userid='+localStorage.id).subscribe(resp=>{
      this.driverlist=resp.lstItems;
    })
      }

      getallcustomerjobworklist(id:string)
      {
        this.apiservice.postapi('api/jobwork/customerjobworkdetailsofpendingpayment?id='+id).subscribe(resp=>{
          this.jobworklist=resp.lstItems.filter((resp)=>{
            return resp.totalamt!==resp.receivedamt;
          });
this.readonly=true;
          this.pform.get('amount').setValue('');

          this.apiservice.postapi('api/customerpayment/custometpaymentdetailsbycustomerid?id='+id).subscribe(resp=>{
            this.custpaymentlist=resp.lstItems;
          
          });
        
        })
      }
    
     


      onCheckboxChange(id:string){
        console.log(id);
        $("[id*=chkId]").each(function () {
          debugger;
          console.log($(this)[0].cid);
          if (id !== $(this)[0].cid) {
            $(this).prop('checked', false);
            this.readonly=true;
           // this.pform.get('amount').setValue(' ');
           // id="";
          }
          else{
            $(this).prop('checked', true);
            this.readonly=true;
          }
         
      });
      // if(id!="")
          // {
            const jobwork=this.jobworklist.filter((resp)=>{
              return resp.id===id;
            });
            this.pform.get('jobworkid').setValue(jobwork[0].id);
            this.pform.get('amount').setValue(jobwork[0].totalamt - jobwork[0].receivedamt);
           // this.disable=true;
           this.readonly = false;
          // }
    }
      addpayment(){

this.submitted=true;
if(!this.pform.valid && this.submitted){
  return false;
}
this.apiservice.postapi('api/customerpayment/addcustomerpayment',this.pform.value).subscribe(resp=>{
  if(resp.status){
  
    this.reset();
    this.toastr.success(resp.message);

    this.getallcustomerjobworklist(this.pform.get('customerid').value);
   
   
  }
  else
  {
    this.toastr.error(resp.message);
    
  }
})
      }

      delete(id:string){
        this.apiservice.postapi('api/customerpayment/deletepaymentdetails?id='+id).subscribe(resp=>{
if(resp.status){
  this.toastr.success(resp.message);
  this.getallcustomerjobworklist(this.pform.get('customerid').value);

}
        });
      }

clear(){
  this.pform.reset();
}

      reset(){
         
        this.pform.reset({
          id:'0',
          userid:localStorage.id,
          customerid:this.pform.get('customerid').value,
          paymenttype:'Received',
           jobworkid:'',
          paymentby:'select',
          chequeno:'',
          paymentdate:'',
          amount:'',
          remark:''
        });
      
      }
      keyPress(event:any){
 
        const pattern = /[0-9\+\-\.\ ]/;
        let inputChar=String.fromCharCode(event.charCode);
        if(!pattern.test(inputChar) && event.charCode!='0'){
          event.preventDefault();
        }
      }

      //https://stackoverflow.com/questions/57087642/how-to-read-data-sent-from-web-api-using-signalr-in-angular
}
