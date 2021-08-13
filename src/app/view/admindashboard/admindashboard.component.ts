import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
 import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
 import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  modalRef: BsModalRef; 
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  jobworklist:any=[];
  vehiclelist:any=[];
  jobworklistbycust:any=[];
  customerpendingamount:any=[];
  userlist:any=[];
  pagesize:number=10;
  vehiclecount:number=0;
  customercount:number =0;
  pendingamount:number=0;
  receivedamount:number=0;
  pageNumber:number=1;
  lastPage:number=1;
  customername:any;
  totalamt:any;
  constructor( private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getvehiclerequestlist();
    this.getalluserlist();
  }
  getvehiclerequestlist(){
    this.apiservice.getapi('api/vehicleMaster/allvehiclelistwithoutapprove').subscribe(resp=>{
      this.vehiclelist=resp.lstItems;

    })
  }

  getalluserlist()
  {
    this.apiservice.postapi('api/cartingregistartion/getAllUser?pageNo='+this.pageNumber+'&pageSize='+this.pagesize).subscribe(resp=>{
       this.userlist=resp.lstItems;
    });
  }
  approve(Id:string){
    this.apiservice.postapi('api/vehicleMaster/approvedvehicle?id='+Id).subscribe(resp=>{
if(resp.status){
  this.toastr.success(resp.message);
  this.getvehiclerequestlist();
}
    });
  }
}
