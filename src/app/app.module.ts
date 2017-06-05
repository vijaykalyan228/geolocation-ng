import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {} from '@types/googlemaps';

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ParamsComponent } from './params/params.component';
import {routing, appRoutingProviders} from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    ParamsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBj-rC5Ml4lEQ17ZTFc08YjzLfS1J03rpM',
      libraries: ["places"]
    })
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
