import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/userservice/user.service';
declare function openForm() : any;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private UserService: UserService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.UserService.logout();
                // this.router.navigate(['/']);
                //location.reload(true);
                openForm();
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}