import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import * as $ from 'jquery' 
import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  submitted:boolean=false; 
  jobworklist:any=[];
  custpaymentlist:any=[];
  id:any;
  invoiceno:any;
   orderdate:any;
   customername:any;
   address:any;
   landmark:any;
   phoneno:any;
   email:any;
   city:any;
   discount:any;
   shippingcharge:any;
   subtotal:any;
   total:any;
   orderno:any;
   date:any;
   odate: any;
   status:any;
   totalqty:any=[];
   totalamt:any;
name:any;
companyname:any;
compaddress:any;
compmobileno:any;
compemail:any;
compownername:any;



  constructor(private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private route:Router,
    private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    console.log(this.router.snapshot.queryParamMap.get('id'));
    this.getjobworkdetails();
    this.getcompnaydetails();
  }

  getjobworkdetails(){
    this.apiservice.postapi('api/jobwork/alljobworkdetailslistbyid?id='+this.router.snapshot.queryParamMap.get('id'),this.router.snapshot.queryParamMap.get('id')).subscribe(resp=>{
   
   this.jobworklist=resp.lstItems[0].jobworkdetails;
   this.totalamt=resp.lstItems[0].totalamt;
      this.customername=resp.lstItems[0].customername;
   this.getcustomerdetails(resp.lstItems[0].customerid);
   this.invoiceno=resp.lstItems[0].invoiceno;
   this.date=resp.lstItems[0].createAt;
  //  this.totalamt=resp.totalamt;
    })
   }
   getcustomerdetails(id:string){
  this.apiservice.postapi('api/customer/customerinfobyid?id='+id).subscribe(resp=>{
this.address=resp.lstItems[0].address;
this.name=resp.lstItems[0].name;
this.phoneno=resp.lstItems[0].mobileno;


  });
}
   getcompnaydetails(){
this.apiservice.postapi('api/cartingregistartion/getUserinfo?id='+localStorage.id).subscribe(resp=>{
this.companyname=resp.lstItems[0].compnayname;
this.compmobileno=resp.lstItems[0].PhoneNumber;
this.compownername=resp.lstItems[0].name;
this.compaddress=resp.lstItems[0].address;
this.email=resp.lstItems[0].email;
});
   }


}
