import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginform:FormGroup;
  formSubmitted: boolean =false;
  constructor(
    private apiservice:ApiService,
    private toast:ToastrService,
    private appservice:AppService,
    private sppiner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
  
  this.loginform = new FormGroup({
username:new FormControl('',Validators.required),
password:new FormControl('',Validators.required)
  });
  }

login()
{

  this.formSubmitted=true;
  if(this.loginform.valid && this.formSubmitted)
  {
    this.sppiner.show();
    const body=new URLSearchParams();
    body.set('username',this.loginform.value.username);
    body.set('password',this.loginform.value.password);
    body.set('grant_type','password');
    const options = {
      headers: new HttpHeaders().set('Content-Type','application/X-WWW-form-urlencoded')
    };
    this.apiservice.postapi('token',body.toString(),options).subscribe(resp=>{
      if(resp){
        this.toast.success('','login successfully..');
        this.appservice.login(resp);
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
