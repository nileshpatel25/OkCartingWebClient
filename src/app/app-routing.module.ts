import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AddadvancesalaryComponent } from './view/addadvancesalary/addadvancesalary.component';
import { AddattendanceComponent } from './view/addattendance/addattendance.component';
import { AddpetrolpumpComponent } from './view/addpetrolpump/addpetrolpump.component';
import { AdmindashboardComponent } from './view/admindashboard/admindashboard.component';
import { AdvancesalarylistComponent } from './view/advancesalarylist/advancesalarylist.component';
import { CustomerComponent } from './view/customer/customer.component';
import { CustomerlistComponent } from './view/customerlist/customerlist.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { DriverComponent } from './view/driver/driver.component';
import { DriverattendanceComponent } from './view/driverattendance/driverattendance.component';
import { DriverlistComponent } from './view/driverlist/driverlist.component';
import { ForgetpasswordComponent } from './view/forgetpassword/forgetpassword.component';
import { FuelComponent } from './view/fuel/fuel.component';
import { FuleDetailsComponent } from './view/fule-details/fule-details.component';
import { InvoiceComponent } from './view/invoice/invoice.component';
import { JobworkComponent } from './view/jobwork/jobwork.component';
import { JobworkdetailsComponent } from './view/jobworkdetails/jobworkdetails.component';
import { PaymentComponent } from './view/payment/payment.component';
import { PetrolpumplistComponent } from './view/petrolpumplist/petrolpumplist.component';
import { ProfileComponent } from './view/profile/profile.component';
import { ResetpasswordComponent } from './view/resetpassword/resetpassword.component';
import { VehicleComponent } from './view/vehicle/vehicle.component';
import { VehiclemasterComponent } from './view/vehiclemaster/vehiclemaster.component';
import { VerifyOTPComponent } from './view/verify-otp/verify-otp.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'verifyOTP',component:VerifyOTPComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'',component:LayoutComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'admindashboard',component:AdmindashboardComponent},
    {path:'vehicle',component:VehicleComponent},
    {path:'driverlist',component:DriverlistComponent},
    {path:'driver',component:DriverComponent},
    {path:"addcustomer",component:CustomerComponent},
    {path:'customerlist',component:CustomerlistComponent},
    {path:'profile',component:ProfileComponent},
    {path:'jobwork',component:JobworkComponent},
    {path:'jobworkdetail',component:JobworkdetailsComponent},
    {path:'payment',component:PaymentComponent},
    {path:'invoice',component:InvoiceComponent},
    {path:'driverattendance',component:DriverattendanceComponent},
    {path:'addattendance', component: AddattendanceComponent},
    {path:'fuel',component:FuleDetailsComponent},
    {path:'addfuel',component:FuelComponent},
    {path:'addpetrolpump', component:AddpetrolpumpComponent},
    {path:'petrolpumplist', component: PetrolpumplistComponent},
    {path:'advancelsarylist', component: AdvancesalarylistComponent},
    {path:'addadvanceslary', component: AddadvancesalaryComponent},
    {path:'vehiclemaster',component: VehiclemasterComponent}
   
  ]}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
