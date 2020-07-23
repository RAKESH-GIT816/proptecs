import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/userservice/user.service'

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private UserService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with token if user is logged in and request is to api url
        let token = localStorage.getItem("token");
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjQ1IiwiRW1haWwiOiJ5YXNod2FudGgrMUBteW9yaWdhbWkuY28iLCJleHAiOjE1ODc5MzgyMjh9.5D1MSthX_W7de8d_8HKLtvACjyNkk1iZC61nOmLxMow";
        const isLoggedIn = this.UserService.isLoggedIn();
        if (isLoggedIn && token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': "Bearer " +token
                }
            });
        } 
        return next.handle(request);
    }
}