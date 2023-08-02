import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { PasswordStrengthValidator } from "../../shared/password-strength.validators";

import { Router } from '@angular/router';
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
    private sppiner:NgxSpinnerService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
  console.log(this.test.charAt(0));


  this.loginform = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phonenumber:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    source:new FormControl('Web'),
password:new FormControl('',[Validators.compose([
  Validators.required, Validators.minLength(8), PasswordStrengthValidator])])
  });
}

login()
{
 
   
  this.formSubmitted=true;
  if(this.loginform.valid && this.formSubmitted)
  {
    this.sppiner.show();
   
    this.apiservice.postapi('api/cartingregistartion/register',this.loginform.value).subscribe(resp=>{
      if(resp.status){
        this.toast.success('','registration successfully..');
        this.router.navigate(['/']);
        // const body=new URLSearchParams();
        // body.set('username',this.loginform.value.phonenumber);
        // body.set('password',this.loginform.value.password);
        // body.set('grant_type','password');
        // const options = {
        //   headers: new HttpHeaders().set('Content-Type','application/X-WWW-form-urlencoded')
        // };
        // this.apiservice.postapi('token',body.toString(),options).subscribe(resp=>{
        //   if(resp){
        //     this.toast.success('','registration successfully..');
        //     this.appservice.signup(resp);
        //   }});
      }
      else{
        this.toast.error('Error!',resp.message);
      }
    });
  }else
  {
    this.sppiner.hide();
   
    //this.toast.error('Error!','Invalid User!');
  }
}
keyPress(event:any){
 
  const pattern = /[0-9]/;
  let inputChar=String.fromCharCode(event.charCode);
  if(!pattern.test(inputChar) && event.charCode!='0'){
    event.preventDefault();
  }
}

}

