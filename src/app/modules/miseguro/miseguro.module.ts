import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiseguroRoutingModule } from './miseguro-routing.module';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MiseguroRoutingModule
  ]
})
export class MiseguroModule { }
