import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectedPage } from './expected.page';

const routes: Routes = [
  {
    path: '',
    component: ExpectedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpectedPageRoutingModule {}
