import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
  submitted:boolean=false;
  fform:FormGroup;
  vehiclelist:any=[];
  driverlist:any=[];
  petrolpumplist:any=[];
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
    console.log(this.route.snapshot.queryParamMap.get('id'));
    this.getvehiclelist();
    this.getdriverList();
    this.getpetrolpumplist();
    this.fform=this.fb.group({
id:['0'],
userid:[localStorage.id],
petrolpumpid:['',Validators.required],
vehicleid:['',Validators.required],
driverid:[''],
totalamount:['',Validators.required],
fueldate:['',Validators.required]

    });

    this.id=this.route.snapshot.queryParamMap.get('id');
    if(this.id!=null){
      this.getfuelinfo(this.id);
    }

  }
  getfuelinfo(id: string){
    this.apiservice.postapi('api/fuel/allfuellistbyid?id='+id).subscribe(resp=>{
      const driverinfo=resp.lstItems;
      this.fform.patchValue({
        id:driverinfo[0].id,
        userid:localStorage.id,
        petrolpumpid:driverinfo[0].petrolpumpid,
        vehicleid:driverinfo[0].vehicleid,
      driverid:driverinfo[0].driverid,
      totalamount:driverinfo[0].totalamount,
      fueldate: this.formatDate(driverinfo[0].fueldate)
      });
    });
  }
  
  
  getvehiclelist(){
    this.apiservice.postapi('api/vehicle/allvehiclelistbyuser?userid='+localStorage.id).subscribe(resp=>{
  this.vehiclelist=resp.lstItems;
    });
  }

  getdriverList(){
    this.apiservice.postapi('api/driver/alldriverlistbyuser?userid='+localStorage.id).subscribe(resp=>{
      this.driverlist=resp.lstItems;
        });
  }
  getpetrolpumplist(){
    this.apiservice.postapi('api/fuel/allpetrolpumplistbyuserid?userid='+localStorage.id).subscribe(resp=>{
      this.petrolpumplist=resp.lstItems;
        });
  }
  
  addfuel(){
    this.submitted=true;
  if(!this.fform.valid && this.submitted){
  return false;
  }
  this.apiservice.postapi('api/fuel/addfuel',this.fform.value).subscribe(resp=>{
    if(resp.status){
  this.reset();
  this.router.navigate(['/fuel']);
    }
  })
  
  }
  reset(){
    this.fform.reset();
    this.submitted=false;
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
