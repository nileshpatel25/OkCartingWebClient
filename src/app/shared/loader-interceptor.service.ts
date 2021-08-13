import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService} from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {
  count = 0;
  constructor(
    private spinner:NgxSpinnerService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show()

        this.count++;

        return next.handle(req)

            .pipe ( tap (

                    event => console.log(event),

                    error => console.log( error )

                ), finalize(() => {

                    this.count--;

                    if ( this.count == 0 ) this.spinner.hide ()
                })
            );
              }
  //   this.sppiner.show();
  //   const reqWithCredentials = req.clone({withCredentials: true});
   
  //   return next.handle(reqWithCredentials)
  //    .pipe(
       
  //       catchError(error => {
  //         if (error.status === 401 || error.status === 403) {
  //           // handle error
  //           this.sppiner.hide();
  //         }
  //         this.sppiner.hide();
  //         return throwError(error);
         
         
  //       })
        
  //    ); 
     
  // }
  
}
