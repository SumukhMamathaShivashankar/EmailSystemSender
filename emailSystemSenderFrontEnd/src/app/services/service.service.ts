import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const apiUrl = 'http://localhost:3000/userTable';
const apiCreateUser = 'http://localhost:3000/userPost';
const apiDeleteUser = 'http://localhost:3000/usersDelete';
const apiUpdateUser = 'http://localhost:3000/usersPut';
const apiSendEmail = 'http://localhost:3000/product/postMail';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  //get all users data

  constructor(private http: HttpClient) {}
  getUser(): Observable<any> {
    return this.http.get(`${apiUrl}`);
  }
  //create users
  createUser(data: any): Observable<any> {
    console.log(data, 'data created');
    return this.http.post(`${apiCreateUser}`, data);
  }
  //delete data
  deleteData(id: any): Observable<any> {
    let UserId = id;
    return this.http.delete(`${apiDeleteUser}/${UserId}`);
  }
  //update data
  updateData(data: any, id: any): Observable<any> {
    let UserId = id;
    return this.http.put(`${apiUpdateUser}/${UserId}`, data);
  }
  //getSingleData
  getSingleData(id: any): Observable<any> {
    let UserId = id;
    console.log(`${apiUrl}`, ' - ', `${UserId}`);
    return this.http.get(`${apiUrl}/${UserId}`);
  }
  sendEmail(data: any): Observable<any> {
    console.log(data, 'Sending Email');
    return this.http.post(`${apiSendEmail}`, data);
  }
}
