import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
//get all users data
  apiUrl="http://localhost:3000/userTable";
  apiCreateUser="http://localhost:3000/userPost";
  apiDeleteUser="http://localhost:3000/usersDelete";
  apiUpdateUser="http://localhost:3000/usersPut";
  apiSendEmail="http://localhost:3000/product/postMail";
  
  constructor(private http:HttpClient) { }
  getUser():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }
//create users
createUser(data:any):Observable<any>{
  console.log(data,'data created')
  return this.http.post(`${this.apiCreateUser}`,data);
}
//delete data
deleteData(id:any):Observable<any>{
  let UserId=id;
  return this.http.delete(`${this.apiDeleteUser}/${UserId}`);
  
}
//update data
updateData(data:any,id:any):Observable<any>{
  let UserId=id;
  return this.http.put(`${this.apiUpdateUser}/${UserId}`,data);
}
//getSingleData
getSingleData(id:any):Observable<any>{
let UserId=id;
console.log(`${this.apiUrl}`," - ",`${UserId}`);
return this.http.get(`${this.apiUrl}/${UserId}`);

}
sendEmail(data:any):Observable<any>{
  console.log(data,'Sending Email')
  return this.http.post(`${this.apiSendEmail}`,data);
}

}

