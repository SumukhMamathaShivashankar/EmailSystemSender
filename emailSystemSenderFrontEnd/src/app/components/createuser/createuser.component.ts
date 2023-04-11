import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent implements OnInit {
  // createUsersForm !: FormGroup
  constructor(private api: ServiceService, private router: ActivatedRoute) {}
  errMsg: any;
  successMsg: any;
  getIdParams: any;
  emailSuccessMsg: any;
  ngOnInit(): void {
    this.getIdParams = this.router.snapshot.paramMap.get('id');
    if (this.getIdParams) {
      this.api.getSingleData(this.getIdParams).subscribe((res) => {
        this.createUsersForm.patchValue({
          fullName: res.data[0].fullName,
          email: res.data[0].email,
          phone: res.data[0].phone,
        });
      });
    }
  }
  createUsersForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  /**
   * the below code is intended to add user and send a email
   * after clicking the button "add user". once the button is clicked the
   * userSubmit button is called and method calls two api's to backed one
   * to add user to the data base and the second to send email to the user
   * @param
   * @param
   * @return
   */

  userSubmit() {
    if (this.createUsersForm.valid) {
      this.api.createUser(this.createUsersForm.value).subscribe(
        (res) => {
          this.successMsg = res.message;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.errMsg = 'Please enter all the fields';
    }
    const jsonBody: JSON = <JSON>(<any>{
      userEmail: this.createUsersForm.value.email,
      userName: this.createUsersForm.value.fullName,
    });
    this.api.sendEmail(jsonBody).subscribe((res) => {
      this.emailSuccessMsg = true;
    });
  }
  /**
   * the below code is intended to update the user information
   * after clicking the button "update user". This button appears
   *  only when the variable getParamsId has a value. Once the button is
   * clicked the api to update the user information is called.
   */

  updateUser() {
    if (this.createUsersForm.valid) {
      this.api
        .updateData(this.createUsersForm.value, this.getIdParams)
        .subscribe(
          (res) => {
            this.successMsg = res.value;
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      this.errMsg = 'Please enter all fields';
    }
  }
}
