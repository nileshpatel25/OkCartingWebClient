import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  submitted:boolean=false;
  pform:FormGroup;
  name:any;
  compnayname:any;
  address:any;
  gstin:any;
  discription: any;
  PhoneNumber:any;
  UserName:any;
  Email:any;
  
  constructor( private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getuserinfo();
    this.pform=this.fb.group({
      id:localStorage.id,
      name:['',Validators.required],
      compnayname:['',Validators.required],
      address:['',Validators.required],
      gstin:[''],
      discription:[''],
      othercontactno:[''],
      address2:[''],
      landmark:[''],
      city:[''],
      pincode:['']
    });
  }

  getuserinfo()
  {
    this.apiservice.postapi('api/cartingregistartion/getUserinfo?id='+localStorage.id).subscribe(resp=>{
const user = resp.lstItems;
this.name=user[0].name;
this.compnayname=user[0].compnayname;
this.address=user[0].address;
this.gstin=user[0].gstin;
this.discription=user[0].discription;
this.PhoneNumber=user[0].PhoneNumber;
this.Email=user[0].Email;
this.UserName=user[0].UserName;

this.pform.patchValue({
id:localStorage.id,
name:user[0].name,
compnayname:user[0].compnayname,
address:user[0].address,
gstin:user[0].gstin,
discription:user[0].discription,
landmark:user[0].landmark,
city:user[0].city,
pincode:user[0].pincode,
othercontactno:user[0].othercontactno,
address2:user[0].address2


});
    });
  }

  updateprofile()
  {
this.submitted=true;
if(!this.pform.valid && this.submitted){
  return false;
}
this.apiservice.postapi('api/cartingregistartion/profileupdate',this.pform.value).subscribe(resp=>{
  if(resp.status){
    this.getuserinfo();
    this.toastr.success(resp.message);
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
