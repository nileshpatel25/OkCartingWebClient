import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';

import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vehiclereport',
  templateUrl: './vehiclereport.component.html',
  styleUrls: ['./vehiclereport.component.css']
})
export class VehiclereportComponent implements OnInit {
  submitted:boolean=false;
  fform:FormGroup;
  hiringList:any=[];
  pdfpath:any;
  constructor( private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.fform=this.fb.group({
      userid:localStorage.id,
      fromdate:['',Validators.required],
      todate:['',Validators.required]
    
    });
  }
  onsubmit(){
    
this.submitted=true;
if(this.fform.valid){
  
  this.apiservice.postapi('api/report/vehiclehistorybetweendate?userid='+this.fform.get('userid').value+'&fromdate='+this.fform.get('fromdate').value+'&todate='+this.fform.get('todate').value,this.fform.value).subscribe(resp=>{
if(resp.status){

  this.hiringList=resp.lstItems;
  this.pdfpath=resp.invoicepath;
  console.log(resp.lstItems);
}
else
{
  this.toastr.success(resp.invoicepath);
}


  })
}
  }
}