import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
 import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
 import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
@Component({
  selector: 'app-jobworkdetails',
  templateUrl: './jobworkdetails.component.html',
  styleUrls: ['./jobworkdetails.component.css']
})
export class JobworkdetailsComponent implements OnInit {
  modalRef: BsModalRef; 
   @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  jobworklist:any=[];
  jobworklistbycust:any=[];
  pagesize:number=10;
  pageNumber:number=1;
  lastPage:number=1;
  customername:any;
  totalamt:any;
  constructor(private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getallcustomerjobworklist();
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
  getallcustomerjobworklist()
  {
    this.apiservice.postapi('api/jobwork/alljobworkdetails?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
      this.jobworklist=resp.lstItems;
      this.lastPage=resp.objItem/this.pagesize;
      if(this.pageNumber > this.lastPage){
        this.lastPage=this.pageNumber;
      }
    })
  }
  delete(id:string){
console.log(id);
this.apiservice.postapi('api/jobwork/deletejobwork?id='+id).subscribe(resp=>{
if(resp.status){
  this.toastr.success(resp.message);
  this.getallcustomerjobworklist();
}
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
  
  onChange(id:string){
    this.apiservice.postapi('api/jobwork/updatestatus?id='+id+'&userid='+localStorage.id).subscribe(resp=>{
      if(resp.status){
        this.toastr.success(resp.message);
        this.getallcustomerjobworklist();
      }
      else{
        this.toastr.error(resp.message);
      }
    })
  }
  Sendinvoicesms(id:string){
    this.apiservice.postapi('api/jobwork/sendpdfinvoice?id='+id).subscribe(resp=>{
      if(resp.status){
        this.toastr.success(resp.message);
        //this.getallcustomerjobworklist();
      }
      else{
        this.toastr.error(resp.message);
      }
    })
  }
}

