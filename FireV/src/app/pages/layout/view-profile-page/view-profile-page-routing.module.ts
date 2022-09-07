import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ViewProfileComponent } from 'src/app/pages/components/view-profile/view-profile.component';
import { ViewProfilePageComponent } from './view-profile-page.component';

const routes: Routes = [{ path: '', component: ViewProfilePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProfilePageRoutingModule { }
