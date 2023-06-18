import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
 import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
 import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef; 
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  jobworklist:any=[];
  jobworklistbycust:any=[];
  customerpendingamount:any=[];
  pagesize:number=10;
  vehiclecount:number=0;
  customercount:number =0;
  pendingamount:number=0;
  receivedamount:number=0;
  pageNumber:number=1;
  lastPage:number=1;
  customername:any;
  totalamt:any;
  constructor(
    private apiservice:ApiService,
    private appservice:AppService,
    private router:Router,
    private toastr:ToastrService,private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    const firstTime = localStorage.getItem('key')
      if(!firstTime){
        localStorage.setItem('key','loaded')
       window.location.reload()
      }else {
        localStorage.removeItem('key') 
      }
    this.appservice.checktoken();
    this.getallcustomerjobworklist();
    this.getallcustomerjobworkpendingamountlist();
    this.getallvehiclelistbyuserid();
    this.getallCustomeristbyuserid();
    this.getallpendingamountlist();
    
  }
  getallcustomerjobworklist()
  {
    
    this.apiservice.postapi('api/jobwork/alljobworkdetails?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
      this.jobworklist=resp.lstItems;
      this.lastPage=resp.lstItems.length/this.pagesize;
      if(this.pageNumber > this.lastPage){
        this.lastPage=this.pageNumber;
      }
    })
  }
  getallvehiclelistbyuserid(){
    this.apiservice.postapi('api/vehicle/allvehiclelistbyuser?userid='+localStorage.id).subscribe(resp=>{
      this.vehiclecount=resp.lstItems.length;

    })
  }

  getallCustomeristbyuserid(){
    this.apiservice.postapi('api/customer/allcustomerslistbyuser?userid='+localStorage.id).subscribe(resp=>{
      this.customercount=resp.lstItems.length;

    })
  }
  openModalWithClass(template: TemplateRef<any>,id:string) {  
    console.log(id);
    this.apiservice.postapi('api/jobwork/alljobworkdetailslistbyid?id='+id).subscribe(resp=>{
      this.jobworklistbycust=resp.lstItems[0].jobworkdetails;
      this.customername=resp.lstItems[0].customername;
      this.totalamt=resp.lstItems[0].totalamt;
    });
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
  } 


  getallcustomerjobworkpendingamountlist()
  {
    this.apiservice.postapi('api/jobwork/jobworkdetailsofpendingpaymentbyuserid?userid='+localStorage.id).subscribe(resp=>{
      this.customerpendingamount=resp.lstItems.filter((resp)=>{
        return resp.pendingamt!==0;
      });;

    })
  }
  getallpendingamountlist()
  {
    this.apiservice.postapi('api/jobwork/amountdetails?userid='+localStorage.id).subscribe(resp=>{
    
      this.receivedamount=resp.lstItems;
      this.pendingamount=resp.objItem;
    });
    
  }

  next()
  {
    this.pageNumber++;
    this.pageNumber=this.pageNumber;
    this.getallcustomerjobworklist();  
  }
  
  prev()
  {
    this.pageNumber--;
    this.pageNumber=this.pageNumber;
    this.getallcustomerjobworklist();
  }

}
