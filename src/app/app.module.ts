import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,NgControl} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { VehicleComponent } from './view/vehicle/vehicle.component';
import { DriverComponent } from './view/driver/driver.component';
import { CustomerComponent } from './view/customer/customer.component';
import { CustomerlistComponent } from './view/customerlist/customerlist.component';
import { DriverlistComponent } from './view/driverlist/driverlist.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './shared/http.service';
import { ApiService } from './shared/api.service';
import { ToastrModule } from 'ngx-toastr';
import { LoaderInterceptorService } from './shared/loader-interceptor.service';
import { NgxSpinnerModule} from 'ngx-spinner';
import {NgxPrintModule} from 'ngx-print';
import { ProfileComponent } from './view/profile/profile.component';
import { JobworkComponent } from './view/jobwork/jobwork.component';
import {  MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {  MatTableModule } from '@angular/material/table';

import { JobworkdetailsComponent } from './view/jobworkdetails/jobworkdetails.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UiSwitchModule} from 'ngx-ui-switch';
import { PaymentComponent } from './view/payment/payment.component';
import { InvoiceComponent } from './view/invoice/invoice.component';
import { DisableDirective } from './shared/disable-control.directive';
import { DriverattendanceComponent } from './view/driverattendance/driverattendance.component';
import { FuelComponent } from './view/fuel/fuel.component';
import { FuleDetailsComponent } from './view/fule-details/fule-details.component';
import { ForgetpasswordComponent } from './view/forgetpassword/forgetpassword.component';
import { VerifyOTPComponent } from './view/verify-otp/verify-otp.component';
import { ResetpasswordComponent } from './view/resetpassword/resetpassword.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AdmindashboardComponent } from './view/admindashboard/admindashboard.component';
import { AddattendanceComponent } from './view/addattendance/addattendance.component';
import { AdvancesalarylistComponent } from './view/advancesalarylist/advancesalarylist.component';
import { AddadvancesalaryComponent } from './view/addadvancesalary/addadvancesalary.component';
import { VehiclemasterComponent } from './view/vehiclemaster/vehiclemaster.component';
import { AddpetrolpumpComponent } from './view/addpetrolpump/addpetrolpump.component';
import { PetrolpumplistComponent } from './view/petrolpumplist/petrolpumplist.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LayoutComponent,
    VehicleComponent,
    DriverComponent,
    CustomerComponent,
    CustomerlistComponent,
    DriverlistComponent,
    ProfileComponent,
    JobworkComponent,
    JobworkdetailsComponent,
    PaymentComponent,
    InvoiceComponent,
    DisableDirective,
    DriverattendanceComponent,
    FuelComponent,
    FuleDetailsComponent,
    ForgetpasswordComponent,
    VerifyOTPComponent,
    ResetpasswordComponent,
    AdmindashboardComponent,
    AddattendanceComponent,
    AdvancesalarylistComponent,
    AddadvancesalaryComponent,
    VehiclemasterComponent,
    AddpetrolpumpComponent,
    PetrolpumplistComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxPrintModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),  
    NgxSpinnerModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    UiSwitchModule,
    TextMaskModule,
    ToastrModule.forRoot({
      timeOut:10000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
    })
    
  ],
  exports:[
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
 
  ],
  providers: [
    HttpService,
    ApiService,
    
    {provide: HTTP_INTERCEPTORS,useClass:LoaderInterceptorService,multi:true},
    {provide:LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
