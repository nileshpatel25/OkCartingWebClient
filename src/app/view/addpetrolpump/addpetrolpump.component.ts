import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-addpetrolpump',
  templateUrl: './addpetrolpump.component.html',
  styleUrls: ['./addpetrolpump.component.css']
})
export class AddpetrolpumpComponent implements OnInit {
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
      ownername:['',Validators.required],
      contactno:['',Validators.required],
      otherconatcno:[''],
      address:['',Validators.required],
    
      gstin:['']
    });
this.id=this.route.snapshot.queryParamMap.get('id');
if(this.id!=null){
this.customerinfo(this.id);
}
  }

  customerinfo(id:string){
this.apiservice.postapi('api/fuel/petrolpumpdetailsbyid?id='+id).subscribe(resp=>{
const customer=resp.lstItems;
this.cform.patchValue({
  id:customer.id,
  userid:localStorage.id,
  name:customer.name,
  contactno:customer.contactno,
  otherconatcno:customer.otherconatcno,
  address:customer.address,
  ownername:customer.ownername,
 
  gstin:customer.gstin
})
});
  }

addcustomer(){
  this.submitted=true;
  if(!this.cform.valid && this.submitted)
  {
    return false;
  }
  this.apiservice.postapi('api/fuel/addpetrolpump',this.cform.value).subscribe(resp=>{
if(resp.status){
  this.toastr.success(resp.message);
  this.router.navigate(['/petrolpumplist']);
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
