import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemContainerComponent } from './item-container/item-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'items'
  },
  {
    path: ':id',
    component: ItemContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}
