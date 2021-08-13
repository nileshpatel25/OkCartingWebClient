import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal'; 
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  modalRef: BsModalRef; 
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
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
  constructor(
    private apiservice:ApiService,
    private toast: ToastrService,
    private appservice: AppService,
    private fb:FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    this.appservice.checktoken();
    this.getvehiclelist();
    this.getallvehiclelistbyuser();
    this.vform=this.fb.group({
      id:['0'],
      userid:[localStorage.id],
      vehiclename:[null,Validators.required],
      vehiclenumber:[null,Validators.required],
      perhourrate:[null,Validators.required]
    })
this.vmform=this.fb.group({
id:['0'],
vehiclename:[null,Validators.required]
});
   

  }

  addvehicle(){
    this.submitted=true;
    if(this.vform.valid && this.submitted)
    {
      this.apiservice.postapi('api/vehicle/addvehicle',this.vform.value).subscribe(resp=>{
        if(resp.status)
        {
  this.getallvehiclelistbyuser();
  this.toast.success(resp.message);
  this.reset();
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
 

  getallvehiclelistbyuser()
  {
    this.apiservice.postapi('api/vehicle/allvehiclebyuser?pageNo='+ this.pageNumber +'&pageSize='+ this.pagesize +'&userid='+localStorage.id).subscribe(resp=>{

      this.vehiclelist=resp.lstItems;
this.lastPage=resp.lstItems.length / this.pagesize;
if(this.pageNumber > this.lastPage){
  this.lastPage=this.pageNumber;
}
    })
  }

  edit(id:string)
  {
console.log(id);
const vehicle=this.vehiclelist.filter((resp)=>{
  return resp.id===id;
});
this.vform.patchValue({
vehiclename:vehicle[0].vehiclename,
vehiclenumber:vehicle[0].vehiclenumber,
perhourrate:vehicle[0].perhourrate,
id:id,
userid:localStorage.id
});
  }

  delete(id:string)
  {
    console.log(id);
    this.apiservice.postapi('api/vehicle/deletevehicle?id='+id).subscribe(resp=>{
      if(resp.status)
      {
        this.toast.success(resp.message);
      }
    })
  }
reset()
{
  this.submitted=false;
  this.vsubmitted=false;
  this.vform.reset(  );
this.vmform.reset( );
  
}

getvehiclelist(){
  this.apiservice.getapi('api/vehicleMaster/allvehiclelist').subscribe(resp=>{
this.allvehiclelist=resp.lstItems;
  });
}


keyPress(event:any){
 
  const pattern = /[0-9\+\-\.\ ]/;
  let inputChar=String.fromCharCode(event.charCode);
  if(!pattern.test(inputChar) && event.charCode!='0'){
    event.preventDefault();
  }
}




get vehiclenumber() {
  return this.vform.get('vehiclenumber');
}

next()
{
  this.pageNumber++;
  this.pageNumber=this.pageNumber;
  this.getallvehiclelistbyuser();  
}

prev()
{
  this.pageNumber--;
  this.pageNumber=this.pageNumber;
  this.getallvehiclelistbyuser();
}

openModalWithClass(template: TemplateRef<any>){
  this.modalRef = this.modalService.show(  
    template,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}

addvehiclerequest(){
  this.vsubmitted=true;
  if(this.vmform.valid && this.vsubmitted)
  {
    this.apiservice.postapi('api/vehicleMaster/addvehiclemaster',this.vmform.value).subscribe(resp=>{
      if(resp.status)
      {

this.toast.success(resp.message);
this.reset();
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
}
