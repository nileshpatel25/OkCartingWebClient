import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-advancesalarylist',
  templateUrl: './advancesalarylist.component.html',
  styleUrls: ['./advancesalarylist.component.css']
})
export class AdvancesalarylistComponent implements OnInit {
  advancelist:any=[];
  pagesize:number=10;
  pageNumber:number=1;
  lastPage:number=1;
  aform:FormGroup;
  constructor(private apiservice:ApiService,
    private appservice:AppService,
    private fb:FormBuilder,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getalladvancelist();
   
  }
  getalladvancelist()
  {
    this.apiservice.postapi('api/driveradvancesalary/alldriveradvancesalarydetailsbyuserid?pageNo='+this.pageNumber+'&pageSize='+this.pagesize+'&userid='+localStorage.id).subscribe(resp=>{
      this.advancelist=resp.lstItems;
      this.lastPage=resp.lstItems.length/this.pagesize;
      if(this.pageNumber > this.lastPage){
        this.lastPage=this.pageNumber;
      }
    })
  }
  delete(Id:string)
  {
    this.apiservice.postapi('api/driveradvancesalary/deleteadvancesalary?id='+Id).subscribe(resp=>{
      if(resp.status)
      {
      this.getalladvancelist();
      this.toastr.success(resp.message);
      }
      });
  }
  next()
  {
    this.pageNumber++;
    this.pageNumber=this.pageNumber;
    this.getalladvancelist();  
  }
  
  prev()
  {
    this.pageNumber--;
    this.pageNumber=this.pageNumber;
    this.getalladvancelist();
  }
}
