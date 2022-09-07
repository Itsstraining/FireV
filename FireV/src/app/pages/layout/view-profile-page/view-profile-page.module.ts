import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProfilePageRoutingModule } from './view-profile-page-routing.module';
import { ViewProfilePageComponent } from './view-profile-page.component';
import { ShareModule } from 'src/app/modules/share/share.module';


@NgModule({
  declarations: [
    ViewProfilePageComponent
  ],
  imports: [
  CommonModule,
    ViewProfilePageRoutingModule,
    ShareModule
  ]
})
export class ViewProfilePageModule { }
