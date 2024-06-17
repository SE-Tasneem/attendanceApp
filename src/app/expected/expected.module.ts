import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpectedPage } from './expected.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ExpectedPageRoutingModule } from './expected-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ExpectedPageRoutingModule
  ],
  declarations: [ExpectedPage]
})
export class ExpectedPageModule {}
