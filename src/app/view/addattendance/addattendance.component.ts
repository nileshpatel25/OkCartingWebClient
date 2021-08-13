import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addattendance',
  templateUrl: './addattendance.component.html',
  styleUrls: ['./addattendance.component.css']
})
export class AddattendanceComponent implements OnInit {
  submitted:boolean=false;
  aform:FormGroup;

  driverlist:any=[];
  driverinfo:any=[];
id:any;
  constructor( private apiservice:ApiService,
    private appservice:AppService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    console.log(this.route.snapshot.queryParamMap.get('id'));  
    this.getdriverList();
    this.aform=this.fb.group({
      id:['0'],
      userid:[localStorage.id],
   
      driverid:['',Validators.required],
      dtattencanceDate:['',Validators.required],
      status:['',Validators.required]
      
          });
          this.id=this.route.snapshot.queryParamMap.get('id');
          if(this.id!=null){
            this.getatinfo(this.id);
          }
  }
  getatinfo(id: string){
    this.apiservice.postapi('api/driverattendance/driverattanancebyid?id='+id).subscribe(resp=>{
      const driverinfo=resp.lstItems;
      this.aform.patchValue({
        id:driverinfo[0].id,
        userid:localStorage.id,
       
      driverid:driverinfo[0].driverid,
      dtattencanceDate:this.formatDate(driverinfo[0].dtattencanceDate),
      status: driverinfo[0].status
      });
    });
  }

  getdriverdetails(Id:string){
    this.apiservice.postapi('api/driver/driverinfobyid?id='+Id).subscribe(resp=>{
     this.driverinfo=resp.lstItems;
     if(resp.lstItems[0].hireon=='Hourly')
     {
       
     }
        });
  }
  getdriverList(){
    this.apiservice.postapi('api/driver/alldriverlistbyuser?userid='+localStorage.id).subscribe(resp=>{
      this.driverlist=resp.lstItems;
        });
  }

  addattendance()
  {
    this.submitted=true;
  if(!this.aform.valid && this.submitted){
  return false;
  }
  this.apiservice.postapi('api/driverattendance/addattendance',this.aform.value).subscribe(resp=>{
    if(resp.status){
  this.reset();
  this.router.navigate(['/driverattendance']);
    }
    else{
      this.toastr.error(resp.message);
    }
  })
  
  }
  reset(){
    this.aform.reset();
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
