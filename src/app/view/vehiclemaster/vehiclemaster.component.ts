import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal'; 
@Component({
  selector: 'app-vehiclemaster',
  templateUrl: './vehiclemaster.component.html',
  styleUrls: ['./vehiclemaster.component.css']
})
export class VehiclemasterComponent implements OnInit {
  public vform:FormGroup;
  public vmform:FormGroup;
  submitted:boolean=false;
  vsubmitted:boolean=false;
  vehiclelist:any=[];
  allvehiclelist:any=[];
  pagesize:number=5;
  pageNumber:number=1;
  lastPage:number=1;
  public vehiclemask=[/[a-z]{2}/,/[0-9]{2}/,/[a-z]{1,2}/,/[0-9]{4}/];
  public mask = [ /[A-Z]/,/[A-Z]/, /\d/, /\d/, /[A-Z]/, /[A-Z]/, /\d/, /\d/, /\d/, /\d/];
  constructor(  private apiservice:ApiService,
    private toast: ToastrService,
    private appservice: AppService,
    private fb:FormBuilder,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getvehiclelist();
    this.vmform=this.fb.group({
      id:['0'],
      vehiclename:[null,Validators.required]
      });
  }
  getvehiclelist(){
    this.apiservice.getapi('api/vehicleMaster/allvehiclelist').subscribe(resp=>{
  this.allvehiclelist=resp.lstItems;
    });
  }

  addvehiclerequest(){
    this.vsubmitted=true;
    if(this.vmform.valid && this.vsubmitted)
    {
      this.apiservice.postapi('api/vehicleMaster/addvehiclemaster',this.vmform.value).subscribe(resp=>{
        if(resp.status)
        {
          this.getvehiclelist();
  this.toast.success(resp.message);
  this.vmform.reset();
  //   this.vform.reset({
  //     id:'0',
  //     userid:localStorage.id,
  // vehiclename:null,
  // vehiclenumber:null,
  // perhourrate:null
  //   });
  }
  else{
  this.toast.error(resp.message);
  }
      });
  
    }
  }

  edit(id:string)
  {
console.log(id);
const vehicle=this.allvehiclelist.filter((resp)=>{
  return resp.id===id;
});
this.vmform.patchValue({
  vehiclename:vehicle[0].vehiclename,
id:id

});
  }

  delete(id:string)
  {
    console.log(id);
    this.apiservice.postapi('api/vehicleMaster/deletevehicle?id='+id).subscribe(resp=>{
      if(resp.status)
      {
        this.toast.success(resp.message);
      }
    })
  }
  approve(Id:string){
    this.apiservice.postapi('api/vehicleMaster/approvedvehicle?id='+Id).subscribe(resp=>{
if(resp.status){
  this.toast.success(resp.message);
  this.getvehiclelist();
}
    });
  }
}
