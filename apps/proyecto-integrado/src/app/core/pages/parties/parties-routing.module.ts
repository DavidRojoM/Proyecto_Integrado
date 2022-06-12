import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartiesComponent } from './parties.component';
import { PartyComponent } from './party/party.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: PartyComponent,
  },
  {
    path: '',
    component: PartiesComponent,
  },

  {
    path: '**',
    redirectTo: '/notfound',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartiesRoutingModule {}
