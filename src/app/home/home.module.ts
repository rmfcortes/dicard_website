import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
