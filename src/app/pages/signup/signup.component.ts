import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public loginform:FormGroup;
  formSubmitted: boolean =false;
  public loginfrm:FormGroup;
  test: string='Hello   ';
  constructor(
    private apiservice:ApiService,
    private toast:ToastrService,
    private appservice:AppService,
    private sppiner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
  console.log(this.test.charAt(0));
  this.loginform = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phonenumber:new FormControl('',Validators.required),
    source:new FormControl('Web'),
password:new FormControl('',Validators.required)
  });
}

login()
{

  this.formSubmitted=true;
  if(this.loginform.valid && this.formSubmitted)
  {
    this.sppiner.show();
   
    this.apiservice.postapi('api/cartingregistartion/register',this.loginform.value).subscribe(resp=>{
      if(resp){
       
        const body=new URLSearchParams();
        body.set('username',this.loginform.value.phonenumber);
        body.set('password',this.loginform.value.password);
        body.set('grant_type','password');
        const options = {
          headers: new HttpHeaders().set('Content-Type','application/X-WWW-form-urlencoded')
        };
        this.apiservice.postapi('token',body.toString(),options).subscribe(resp=>{
          if(resp){
            this.toast.success('','registration successfully..');
            this.appservice.signup(resp);
          }});
      }
      else{
        this.toast.error('Error!',resp.error_description);
      }
    });
  }else
  {
    this.toast.error('Error!','Invalid User!');
  }
}


}

