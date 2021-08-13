import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/app.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public fForm: FormGroup;
  public isAuthLoading = false;
  formSubmitted: boolean = false;
  constructor(private toastr: ToastrService,
    private appService: AppService,
    public apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.fForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmpassword: new FormControl(null, Validators.required),
     }
     
    );
  }

  
  Send() {
   
    this.formSubmitted = true;
    if (this.fForm.valid && this.formSubmitted) {
    
     
      this.apiService.postapi('api/cartingregistartion/resetpassword?password='+this.fForm.value.password,  this.fForm.value).subscribe(resp => {
        if (resp) {
          this.toastr.success('', 'Password reset successfully');
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.toastr.error('Error!', 'Invalid password!');
    }
  }
}
