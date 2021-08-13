import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customerlist:any=[];
  pagesize:number=5;
  pageNumber:number=1;
  lastPage:number=1;
  constructor( private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getallcustomerlist();
  }

  getallcustomerlist()
  {
    this.apiservice.postapi('api/customer/allcustomerbyuser?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
      this.customerlist=resp.lstItems;
      this.lastPage=resp.lstItems.length/this.pagesize;
      if(this.pageNumber > this.lastPage){
        this.lastPage=this.pageNumber;
      }
    })
  }
  delete(id:string){

  }
  next()
  {
    this.pageNumber++;
    this.pageNumber=this.pageNumber;
    this.getallcustomerlist();  
  }
  
  prev()
  {
    this.pageNumber--;
    this.pageNumber=this.pageNumber;
    this.getallcustomerlist();
  }
  
  
}
