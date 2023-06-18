import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  submitted:boolean=false;
  dform:FormGroup;
  fileData: File=null;
  adharcardfiledata:File=null;
  licensefiledata:File=null;
  vehiclelist:any=[];
id:any;
  constructor(
    private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    console.log(this.route.snapshot.queryParamMap.get('id'));
    this.getvehiclelist();
    this.dform=this.fb.group({
id:['0'],
userid:[localStorage.id],
vehicleid:['',Validators.required],
name:['',Validators.required],
mobileno:['',Validators.required],
othermobileno:[''],
address:['',Validators.required],
address2:[''],
landmark:[''],
adharcardno:['',Validators.required],
licenseno:['',Validators.required],
licensevalidupto:['',Validators.required],
hireon:['',Validators.required],
perdaysalary:['',Validators.required],
dateofjoining:['',Validators.required]

    });

    this.id=this.route.snapshot.queryParamMap.get('id');
    if(this.id!=null){
      this.getdriverInfo(this.id);
    }
  }

getdriverInfo(id: string){
  this.apiservice.postapi('api/driver/driverinfobyid?id='+id).subscribe(resp=>{
    const driverinfo=resp.lstItems;
    this.dform.patchValue({
      id:driverinfo[0].id,
      userid:localStorage.id,
      vehicleid:driverinfo[0].vehicleid,
      name:driverinfo[0].name,
      mobileno:driverinfo[0].mobileno,
      othermobileno:driverinfo[0].othermobileno,
      address:driverinfo[0].address,
      address2:driverinfo[0].address2,
      landmark:driverinfo[0].landmark,
      adharcardno:driverinfo[0].adharcardno,
      licenseno:driverinfo[0].licenseno,
      perdaysalary:driverinfo[0].perdaysalary,
      dateofjoining:this.formatDate(driverinfo[0].joingdate),
      hireon:driverinfo[0].hireon,
      licensevalidupto:this.formatDate(driverinfo[0].licensevaliduptovalid)
    });
  });
}


getvehiclelist(){
  this.apiservice.postapi('api/vehicle/allvehiclelistbyuser?userid='+localStorage.id).subscribe(resp=>{
this.vehiclelist=resp.lstItems;
  });
}
fileProgress(fileInput: any){
  this.fileData=fileInput.target.files[0] as File
  ImageData: this.fileData
  }


  uploadImage(id){
    const formdata=new FormData();
    formdata.append('File',this.fileData);
    formdata.append('Id',id);
    if(this.fileData!=null){
      this.apiservice.postapi('api/driver/uploaddriverimage', formdata).subscribe((resp) => {
            
      });
    }
  }

  fileadharcardprogress(fileInput:any){
    this.adharcardfiledata=fileInput.target.files[0] as File
  }
  uploadadharcard(id){
    const formdata=new FormData();
    formdata.append('File',this.adharcardfiledata);
    formdata.append('Id',id);
    if(this.adharcardfiledata!=null){
      this.apiservice.postapi('api/driver/uploaddriveradharcard', formdata).subscribe((resp) => {
            
      });
    }
  }
  filelicenseprogress(fileInput:any){
    this.licensefiledata=fileInput.target.files[0] as File
  }

  uploadlicense(id){
    const formdata=new FormData();
    formdata.append('File',this.licensefiledata);
    formdata.append('Id',id);
    if(this.licensefiledata!=null){
      this.apiservice.postapi('api/driver/uploaddriverlincense', formdata).subscribe((resp) => {
            
      });
    }
  }

adddrive(){
  this.submitted=true;
if(!this.dform.valid && this.submitted){
return false;
}
this.apiservice.postapi('api/driver/adddriver',this.dform.value).subscribe(resp=>{
  if(resp.status){

    if(this.fileData!=null){
      this.uploadImage(resp.objItem);
      }
      if(this.adharcardfiledata!=null){
        this.uploadadharcard(resp.objItem);
        }
        if(this.licensefiledata!=null){
          this.uploadlicense(resp.objItem);
          }
this.reset();
this.router.navigate(['/driverlist']);
  }
})

}
reset(){
  this.dform.reset();
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
