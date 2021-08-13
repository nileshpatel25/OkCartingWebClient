import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-jobwork',
  templateUrl: './jobwork.component.html',
  styleUrls: ['./jobwork.component.css']
})
export class JobworkComponent implements OnInit {
  submitted:boolean=false;
  dform:FormGroup;
  vehiclelist:any=[];
  driverlist:any=[];
  id:any;
totalrow:number;
  constructor(   private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    console.log(this.route.snapshot.queryParamMap.get('id'));
    this.getvehiclelist();
    this.getdriverlist();
    this.dform=this.fb.group({
      id:['0'],
      userid:[localStorage.id],
    //  vehicleid:['',Validators.required],
      customerid:['',Validators.required],
    //   hour:['',Validators.required],
    //   perhourrate:[''],
    //  totalamount:['',Validators.required],
    //   workdate:[''],
      paymenttype:[''],
      // discrition:['',Validators.required],
      jobworkdetails:this.fb.array([this.itemarray()])
    
          });
          this.id=this.route.snapshot.queryParamMap.get('id');
if(this.id!=null){
this.jobworkdetailinfo(this.id);
}
  }
   get formData() { return <FormArray>this.dform.get('jobworkdetails'); }
  
  addnewrow(){
    const controls=<FormArray>this.dform.get('jobworkdetails');
    controls.push(this.itemarray());
  }
  deleterow(index:number){
   // this..removeAt(i);
    const control = <FormArray>this.dform.get('jobworkdetails');
    if(control!=null){
this.totalrow=control.value.length;
    }
    if(this.totalrow>1){
      control.removeAt(index);
    }
    else{
      alert("one row is mandatory")
      return false;
    }
    
//this.formarry.removeAt(index);
  }
  jobworkdetailinfo(id:string){
    this.apiservice.postapi('api/jobwork/alljobworkdetailslistbyid?id='+id).subscribe(resp=>{
    const jobwork=resp.lstItems;
    this.dform.patchValue({
      id:jobwork[0].id,
      userid:localStorage.id,
      customerid:jobwork[0].customerid,
      paymenttype:jobwork[0].paymenttype
    //  jobworkdetails:jobwork[0].jobworkdetails
    })
   
     for(let i=0;i<jobwork[0].jobworkdetails.length;i++)
    {
      const controls=<FormArray>this.dform.get('jobworkdetails');
      if(i!=0){
        controls.push(this.itemarray());
      }
     
      controls.controls[i].get('vehicleid').setValue(jobwork[0].jobworkdetails[i].vehicleid);
      controls.controls[i].get('hour').setValue(jobwork[0].jobworkdetails[i].hour);
      controls.controls[i].get('perhourrate').setValue(jobwork[0].jobworkdetails[i].perhourrate);
      controls.controls[i].get('totalamount').setValue(jobwork[0].jobworkdetails[i].totalamount);
      controls.controls[i].get('discrition').setValue(jobwork[0].jobworkdetails[i].discrition);
      controls.controls[i].get('workdate').setValue( this.formatDate(jobwork[0].jobworkdetails[i].workdate));
        // vehicleid:controls[i].vehicleid.setValue,   
        // hour:controls[i].hour, 
        // perhourrate:controls[i].perhourrate, 
        // totalamount:controls[i].totalamount, 
        // workdate:controls[i].workdate, 
        // discrition:controls[i].discrition
     
    }
     });
      }
itemarray(){
  return this.fb.group({
  //  vehiclname:['']
    vehicleid:['',Validators.required],  
    driverid:['',Validators.required],
    hour:['0',Validators.required],
    perhourrate:['0',Validators.required],
    totalamount:['0',Validators.required],
    workdate:['',Validators.required],  
    discrition:['',Validators.required]
  });
}

  getvehiclelist(){
    this.apiservice.postapi('api/vehicle/allvehiclelistbyuser?userid='+localStorage.id).subscribe(resp=>{
  this.vehiclelist=resp.lstItems;
    });
  }

  getdriverlist(){
this.apiservice.postapi('api/customer/allcustomerslistbyuser?userid='+localStorage.id).subscribe(resp=>{
  this.driverlist=resp.lstItems;
})
  }
  addjobworkdetails(){
    this.submitted=true;
    if(!this.dform.valid && this.submitted)
 {
   return false;
 }
 this.apiservice.postapi('api/jobwork/addjobwork',this.dform.value).subscribe(resp=>{
if(resp.status){

  this.toastr.success(resp.message);
  this.reset();
  this.router.navigate(["/jobworkdetail"]);
}
 });
  }
reset(){
  this.dform.reset();
  this.submitted=false;
}
  onvehiclechange(event,i){
    const vehivle=this.vehiclelist.filter((resp)=>{
        return resp.id===event;
    });
    const control = <FormArray>this.dform.get('jobworkdetails');
   // .perhourrate
    control.controls[i].get('perhourrate').setValue(vehivle[0].perhourrate);
    //controls.jobworkdetails.controls[0].controls.perhourrate
    //this.dform.controls.jobworkdetails.controls[0].controls.get('perhourrate').setValue(vehivle[0].perhourrate);
  }
  keyPress(event: any) {
 
    const pattern = /[0-9\+\-\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
  
        if (!pattern.test(inputChar) && event.charCode != '0') {
            event.preventDefault();
        }
  }
  onKeyUpEvent(event: any,i){

    console.log(event.target.value);
    const control = <FormArray>this.dform.get('jobworkdetails');
    // .perhourrate
     control.controls[i].get('totalamount').setValue(control.controls[i].get('perhourrate').value * event.target.value);
    
   // this.dform.get('totalamount').setValue((this.dform.get('perhourrate').value) * event.target.value);
  }
  onKeyUpEventamt(event:any,i){
    console.log(event.target.value);
    const control = <FormArray>this.dform.get('jobworkdetails');
    // .perhourrate
     control.controls[i].get('totalamount').setValue(control.controls[i].get('hour').value * event.target.value);
    
   // this.dform.get('totalamount').setValue((this.dform.get('hour').value) * event.target.value);

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
