import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-drivesalary',
  templateUrl: './drivesalary.component.html',
  styleUrls: ['./drivesalary.component.css']
})
export class DrivesalaryComponent implements OnInit {
  submitted:boolean=false;
  fform:FormGroup;
  vehiclelist:any=[];
  driverlist:any=[];
  petrolpumplist:any=[];
  fileData: File=null;
advanceamt:any;
driverid:any;
year:any;
month:any;

id:any;
selectedYear: number;
years: number[] = []; 
  constructor(   private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { 

      this.selectedYear = new Date().getFullYear();
      for (let year = this.selectedYear; year >= 2020; year--) {
        this.years.push(year);
      }
    }

  ngOnInit(): void {
    this.getdriverList();
    this.fform=this.fb.group({
      id:['0'],
      userid:[localStorage.id],
      driverid:['',Validators.required],
      salarytype:[null,Validators.required],
      monthofsalary:[null,Validators.required],
      yearofsalary:[null,Validators.required],    
      salaryofthemonth:['0',Validators.required],
      flgdeductamt:['true',Validators.required],
      flgdeductfullamt:['true',Validators.required],    
      advanceamtdeduct:['0',Validators.required],
      salarypayofmonth:['0',Validators.required],
      remark:[''],
      dtsalaryDate:['',Validators.required]
          });
          this.fform.get('flgdeductfullamt').disable();
          this.fform.get('advanceamtdeduct').disable();
          this.fform.get('salaryofthemonth').disable();
          this.fform.get('salarypayofmonth').disable();
          
          this.id=this.route.snapshot.queryParamMap.get('id');
          if(this.id!=null){
            this.getsalaryinfo(this.id);
          }
  }
 
getsalaryinfo(id:string){
  this.apiservice.postapi('api/driversalary/driversalarydetailsbyid?id='+id).subscribe(resp=>{
    const driverinfo=resp.lstItems;
    this.fform.patchValue({

      id:driverinfo[0].id,
      userid:driverinfo[0].userid,
      driverid:driverinfo[0].driverid,
      salarytype:driverinfo[0].salarytype,
      monthofsalary:driverinfo[0].monthofsalary,
      yearofsalary:driverinfo[0].yearofsalary,   
      salaryofthemonth:driverinfo[0].salaryofthemonth,
      flgdeductamt:driverinfo[0].flgdeductamt.toString(),
      flgdeductfullamt:driverinfo[0].flgdeductfullamt.toString(),  
      advanceamtdeduct:driverinfo[0].advanceamtdeduct,
      salarypayofmonth:driverinfo[0].salarypayofmonth,
      remark:driverinfo[0].remark,
      dtsalaryDate:this.formatDate(driverinfo[0].dtsalaryDate)

    });

   // this.fform.get('flgdeductfullamt').setValue(driverinfo[0].flgdeductfullamt.toString());
  
  })

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



  getdriverList(){
    this.apiservice.postapi('api/driver/alldriverlistbyuser?userid='+localStorage.id).subscribe(resp=>{
      console.log(resp.lstItems);
      this.driverlist=resp.lstItems;
        });
  }
  changepstatus(event:any){
if(event.target.value=='true'){
  this.fform.get('flgdeductfullamt').enable();
  this.fform.get('advanceamtdeduct').enable();
  this.fform.get('advanceamtdeduct').setValue(this.advanceamt);
  this.fform.get('flgdeductfullamt').setValue('true');
  this.fform.get('advanceamtdeduct').disable();
  this.fform.get('salarypayofmonth').setValue(this.fform.get('salaryofthemonth').value - this.advanceamt);
}
else{
  this.fform.get('flgdeductfullamt').setValue('false');
  this.fform.get('advanceamtdeduct').setValue(0);
  this.fform.get('salarypayofmonth').setValue(this.fform.get('salaryofthemonth').value);
  this.fform.get('advanceamtdeduct').disable();
  this.fform.get('flgdeductfullamt').disable();
}
  }

  chnagefullamount(event:any){
    if(event.target.value=='false'){
      this.fform.get('advanceamtdeduct').enable();
    }
    else{
      this.fform.get('advanceamtdeduct').setValue(this.advanceamt);
      this.fform.get('advanceamtdeduct').disable();

    }
  }
  getsalary(){
  this.driverid=this.fform.get('driverid').value;
  this.year=this.fform.get('yearofsalary').value;
  this.month=this.fform.get('monthofsalary').value;
    this.apiservice.postapi('api/driverattendance/driverattendancebydriveridwithadvancesalary?driverid='+this.driverid+'&attendacemonth='+this.month+'&attendaceyear='+this.year+'').subscribe(resp=>{
      console.log(resp);
      //alert(resp.objItem);
      if(resp.objItem!=null)
      {
        this.fform.get('salaryofthemonth').setValue(resp.objItem);
        this.fform.get('salarypayofmonth').setValue(resp.objItem - resp.dbadvanceamt);
      }
      else{
        this.fform.get('salaryofthemonth').setValue(0);
        this.fform.get('salarypayofmonth').setValue(0);
      }

     this.advanceamt=resp.dbadvanceamt;
      this.fform.get('advanceamtdeduct').setValue(resp.dbadvanceamt);
     // this.driverlist=resp.lstItems;
        });
  }


  onKeyUpEvent(event: any){

    console.log(event.target.value);
    
    this.fform.get('salarypayofmonth').setValue(this.fform.get('salaryofthemonth').value - event.target.value);

   
  }


onsubmit(){
  this.submitted=true;

  if(this.fform.valid){
    this.fform.get('flgdeductfullamt').enable();
    this.fform.get('advanceamtdeduct').enable();
    this.fform.get('salaryofthemonth').enable();
    this.fform.get('salarypayofmonth').enable();
    this.apiservice.postapi('api/driversalary/adddriversalary',this.fform.value).subscribe(resp=>{
this.toastr.success(resp.message);
this.fform.reset();
this.router.navigate(['/driversalarylist']);
    })
  }
}
}
