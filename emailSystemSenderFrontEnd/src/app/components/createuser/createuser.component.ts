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
  ngOnInit(): void {
    this.getIdParams = this.router.snapshot.paramMap.get('id');
    if (this.getIdParams) {
      this.api.getSingleData(this.getIdParams).subscribe((res) => {
        console.log(res, 'selected update date');
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
  userSubmit() {
    if (this.createUsersForm.valid) {
      console.log(this.createUsersForm.value);
      this.api.createUser(this.createUsersForm.value).subscribe(
        (res) => {
          console.log(res, 'Data added');
          this.successMsg = res.message;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.errMsg = 'Please enter all the fields';
    }
  }
  //update User
  updateUser() {
    if (this.createUsersForm.valid) {
      this.api
        .updateData(this.createUsersForm.value, this.getIdParams)
        .subscribe((res) => {
          console.log(res, 'Data updated');
          this.successMsg = res.message;
        });
    } else {
      this.errMsg = 'Please enter all fields';
    }
  }
}
