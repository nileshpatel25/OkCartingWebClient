import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import * as $ from 'jquery' 
import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vendorpayment',
  templateUrl: './vendorpayment.component.html',
  styleUrls: ['./vendorpayment.component.css']
})
export class VendorpaymentComponent implements OnInit {
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
    vendorid:['',Validators.required],
    purchaseid:['',Validators.required],
    paymenttype:['Received'],
    paymentby:['',Validators.required],
    chequeno:[''],
    paymentdate:['',Validators.required],
    amount:['',Validators.required],
    remark:['']
   });
  }
  getdriverlist(){
    this.apiservice.postapi('api/fuel/allpetrolpumplistbyuserid?userid='+localStorage.id).subscribe(resp=>{
      this.driverlist=resp.lstItems;
    })
      }

      getallcustomerjobworklist(id:string)
      {
        this.apiservice.postapi('api/fuel/vendorsfuelsofpendingpayment?id='+id).subscribe(resp=>{
          this.jobworklist=resp.lstItems.filter((resp)=>{
            return resp.totalamt!==resp.receivedamt;
          });
this.readonly=true;
          this.pform.get('amount').setValue('');

          this.apiservice.postapi('api/vendorpayment/vendorpaymentdetailsbyvendorid?id='+id).subscribe(resp=>{
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
            this.pform.get('purchaseid').setValue(jobwork[0].id);
            this.pform.get('amount').setValue(jobwork[0].pendingamt);
           // this.disable=true;
           this.readonly = false;
          // }
    }
      addpayment(){

this.submitted=true;
if(!this.pform.valid && this.submitted){
  return false;
}
this.apiservice.postapi('api/vendorpayment/addvendorpayment',this.pform.value).subscribe(resp=>{
  if(resp.status){
  
    this.reset();
    this.toastr.success(resp.message);
    this.getallcustomerjobworklist(this.pform.get('vendorid').value);
   
   
  }
  else
  {
    this.toastr.error(resp.message);
    
  }
})
      }

      delete(id:string){
        this.apiservice.postapi('api/vendorpayment/deletepaymentdetails?id='+id).subscribe(resp=>{
if(resp.status){
  this.toastr.success(resp.message);
  this.getallcustomerjobworklist(this.pform.get('vendorid').value);

}
        });
      }
      reset(){
         
        this.pform.reset({
          id:['0'],
          userid:[localStorage.id],
          vendorid:this.pform.get('vendorid').value,

          paymenttype:['Received'],
           purchaseid:' ',
          paymentby:' ',
          chequeno:' ',
          paymentdate:' ',
          amount:' ',
          remark:' '
        });
      
      }
      keyPress(event:any){
 
        const pattern = /[0-9\+\-\.\ ]/;
        let inputChar=String.fromCharCode(event.charCode);
        if(!pattern.test(inputChar) && event.charCode!='0'){
          event.preventDefault();
        }
      }


}
