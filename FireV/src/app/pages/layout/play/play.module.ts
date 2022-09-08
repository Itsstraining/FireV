import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';

import { ShareModule } from 'src/app/modules/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PlayModule { }
