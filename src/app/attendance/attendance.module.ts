import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendancePage } from './attendance.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AttendancePageRoutingModule } from './attendance-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AttendancePageRoutingModule
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule {}
