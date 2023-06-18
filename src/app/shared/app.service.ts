import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private router:Router,
    private toast:ToastrService
  ) { }

  login(resp){
    localStorage.setItem('token',resp.access_token);
    localStorage.setItem('id',resp.id);
    localStorage.setItem('expires_in',resp.expires_in);
    localStorage.setItem('username',resp.userName);
    localStorage.setItem('role',resp.Role);
    localStorage.setItem('Name',resp.Name);
  //  localStorage.setItem('key','loaded');
    if(resp.Role=="Admin")
    {
      this.router.navigate(['/admindashboard']);
    }else
    {
      this.router.navigate(['/dashboard']);
     
      //this.router.navigateByUrl('/dashboard',{ skipLocationChange: true });
    
     
    }
   

  }
signup(resp){
  console.log(resp);
  localStorage.setItem('token',resp.access_token);
  localStorage.setItem('id',resp.id);
  localStorage.setItem('expires_in',resp.expires_in);
  localStorage.setItem('username',resp.userName);
  localStorage.setItem('role',resp.Role);
  localStorage.setItem('Name',resp.Name);
  this.router.navigate(['/profile']);
     
}
checktoken(){
  if(!localStorage.id){
    this.toast.info('','token expired');
    this.router.navigate(['/login']);
  }
}
logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('username');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('role');
  localStorage.removeItem('Name');
  this.router.navigate(['/']);
}

}
