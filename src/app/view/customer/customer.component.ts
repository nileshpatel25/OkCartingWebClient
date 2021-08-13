import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  submitted:boolean=false;
  cform:FormGroup;
  
id:any;
  constructor(
    private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.cform=this.fb.group({
      id:['0'],
      userid:[localStorage.id],
      name:['',Validators.required],
      mobileno:['',Validators.required],
      othermobileno:[''],
      address:['',Validators.required],
      address2:[''],
      landmark:[''],
      gstin:['']
    });
this.id=this.route.snapshot.queryParamMap.get('id');
if(this.id!=null){
this.customerinfo(this.id);
}
  }

  customerinfo(id:string){
this.apiservice.postapi('api/customer/customerinfobyid?id='+id).subscribe(resp=>{
const customer=resp.lstItems;
this.cform.patchValue({
  id:customer[0].id,
  userid:localStorage.id,
  name:customer[0].name,
  mobileno:customer[0].mobileno,
  othermobileno:customer[0].othermobileno,
  address:customer[0].address,
  address2:customer[0].address2,
  landmark:customer[0].landmark,
  gstin:customer[0].gstin
})
});
  }

addcustomer(){
  this.submitted=true;
  if(!this.cform.valid && this.submitted)
  {
    return false;
  }
  this.apiservice.postapi('api/customer/addcustomer',this.cform.value).subscribe(resp=>{
if(resp.status){
  this.toastr.success(resp.message);
  this.router.navigate(['/customerlist']);
}
  });
}

  keyPress(event: any) {
 
    const pattern = /[0-9\+\-\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
  
        if (!pattern.test(inputChar) && event.charCode != '0') {
            event.preventDefault();
        }
  }
}
