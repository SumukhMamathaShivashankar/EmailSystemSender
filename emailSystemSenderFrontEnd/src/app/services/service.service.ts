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
  constructor(private http: HttpClient) {}
  //api get all users data
  getUser(): Observable<any> {
    return this.http.get(`${apiUrl}`);
  }
  //api create users
  createUser(data: any): Observable<any> {
    console.log(data, 'data created');
    return this.http.post(`${apiCreateUser}`, data);
  }
  //api delete data with specific id
  deleteData(id: any): Observable<any> {
    let UserId = id;
    return this.http.delete(`${apiDeleteUser}/${UserId}`);
  }
  //api update data with specific id
  updateData(data: any, id: any): Observable<any> {
    let UserId = id;
    return this.http.put(`${apiUpdateUser}/${UserId}`, data);
  }
  //api to get Single Data with specific id
  getSingleData(id: any): Observable<any> {
    let UserId = id;
    console.log(`${apiUrl}`, ' - ', `${UserId}`);
    return this.http.get(`${apiUrl}/${UserId}`);
  }
  //api to get send email
  sendEmail(data: any): Observable<any> {
    console.log(data, 'Sending Email');
    return this.http.post(`${apiSendEmail}`, data);
  }
}
