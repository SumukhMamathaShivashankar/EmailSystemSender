import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {
  constructor(private api: ServiceService) {}
  users: any;
  successMsg: any;
  getIdParams: any;
  userName: any;
  emailSuccessMsg: any;
  ngOnInit(): void {
    this.api.getUser().subscribe((result) => {
      this.users = result.data;
    });
  }
  /**
   * the below code is intended to delete the users from the backend
   * to delete it on the table with reference to id. The api deletes the data
   * in the database
   * @param
   * @return
   */
  deleteUserData(id: any) {
    this.api.deleteData(id).subscribe((res) => {
      this.successMsg = res.message;
      this.getAllData();
    });
  }
  /**
   * the below code is intended to load all the users from the backed
   * to display it on the table. The api gets all the data in the database
   * @param id this is the user id which is the one in the database
   * @return
   */
  getAllData() {
    this.api.getUser().subscribe(
      (res) => {
        this.users = res.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * the below code is intended to send email to the user
   * after clicking the button "email". once the button is
   * clicked the emailUser is called and method calls api to
   * backed send email to the user
   * @param id this is the user id which is the one in the database
   * @param fullName this is the fullname which is the one in the database
   * @param email this is the email address which is the one in the database
   * @return
   */
  emailUser(id: any, fullName: any, email: any) {
    this.getIdParams = id;
    this.userName = fullName;
    const jsonBody: JSON = <JSON>(<any>{
      userEmail: email,
      userName: fullName,
    });
    this.api.sendEmail(jsonBody).subscribe(
      (res) => {
        this.emailSuccessMsg = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
