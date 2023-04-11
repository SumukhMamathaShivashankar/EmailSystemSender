import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit{
  constructor(private api:ServiceService){

  }
  users:any;
  successMsg:any;
  getIdParams:any;
  userName:any;
  ngOnInit(): void {
    this.api.getUser().subscribe((result)=>{
      // console.log('get user by ID',result)
      this.users=result.data;
    })
  }
  deleteUserData(id:any){
    // console.log(id,"selected");
    this.api.deleteData(id).subscribe((res)=>{
      console.log(res,'deleted Id No');
      this.successMsg=res.message;
      this.getAllData();
    })
  }
  getAllData(){
    this.api.getUser().subscribe((res)=>{
      // console.log('getting all data',res);
      this.users=res.data;
    },(error)=>{
      console.error(error);
    })
  }
  emailUser(id:any,fullName:any,email:any){
    this.getIdParams = id;
    this.userName=fullName;
    const jsonBody:JSON = <JSON><any>{
      "userEmail": email,
      "userName":fullName
    }
    this.api.sendEmail(jsonBody).subscribe((res) => {
      console.log(res, 'Data added')
      this.successMsg = res.message;
    })
  }

}
