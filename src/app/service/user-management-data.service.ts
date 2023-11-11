import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserManagementDataService {
  private userId = 'https://13.212.24.193/api/v1/identities/';

  constructor(private http: HttpClient) { }
  getUser():Observable<any> {
    return this.http.get(this.userId);
  }
  getUserById(userId: String):Observable<any> {
    return this.http.get(this.userId + userId);
  }
  deleteUserById(userId: String) :Observable<any>{
    return this.http.delete(this.userId + userId);
  }
  getUserByEmail(userEmail: String): Observable<any> {
    return this.http.get(this.userId + "?email=" + userEmail);
  }
}
