import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVideoComponent } from 'src/app/pages/components/add-video/add-video.component';
import { AddPageComponent } from './add-page.component';

const routes: Routes = [{ path: '', component: AddPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPageRoutingModule { }
