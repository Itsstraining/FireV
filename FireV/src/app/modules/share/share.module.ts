import { SnackBarComponent } from './../../pages/components/snack-bar/snack-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVideoComponent } from 'src/app/pages/components/add-video/add-video.component';
import { ChannelComponent } from 'src/app/pages/components/channel/channel.component';
import { HomeComponent } from 'src/app/pages/components/home/home.component';
import { NavbarComponent } from 'src/app/pages/components/navbar/navbar.component';
import { SideBarComponent } from 'src/app/pages/components/side-bar/side-bar.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UpdateComponent } from 'src/app/pages/components/update/update.component';
import { DiscoverComponent } from 'src/app/pages/components/discover/discover.component';
import { ViewProfileComponent } from 'src/app/pages/components/view-profile/view-profile.component';
import { IntroComponent } from 'src/app/pages/components/intro/intro.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ChannelComponent,
    HomeComponent,
    NavbarComponent,
    AddVideoComponent,
    SideBarComponent,
    UpdateComponent,
    ViewProfileComponent,
    DiscoverComponent,
    IntroComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    ViewProfileComponent,
    ChannelComponent,
    HomeComponent,
    IntroComponent,
    NavbarComponent,
    AddVideoComponent,
    SideBarComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    UpdateComponent,
    MatSnackBarModule,
    SnackBarComponent


  ],
})
export class ShareModule { }
