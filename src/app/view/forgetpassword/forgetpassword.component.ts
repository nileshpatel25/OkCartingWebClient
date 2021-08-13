import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public fForm: FormGroup;
  public isAuthLoading = false;
  formSubmitted: boolean = false;
  constructor(
    private toastr: ToastrService,
    private appService: AppService,
    public apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.fForm = new FormGroup({
      username: new FormControl(null, Validators.required)
     
    });
  }

  Send() {
   
    this.formSubmitted = true;
    if (this.fForm.valid && this.formSubmitted) {
    
     
      this.apiService.postapi('api/cartingregistartion/sendotp?mobileno='+this.fForm.value.username,  this.fForm.value).subscribe(resp => {
        if (resp) {
          this.toastr.success('', 'OTP sent successfully');
          this.router.navigate(['/verifyOTP']);
        }
      });
    } else {
      this.toastr.error('Error!', 'your mobile no not Register!');
    }
  }
}
