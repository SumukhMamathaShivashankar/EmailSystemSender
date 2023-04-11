import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';

const routes: Routes = [
  { path: 'userinfo', component: UserinfoComponent },
  { path: 'createuser/:id', component: CreateuserComponent },
  { path: 'createuser', component: CreateuserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
