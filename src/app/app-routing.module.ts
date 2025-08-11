import { RouterModule, Routes } from '@angular/router';
import { Records } from './records/records';
import { RecordsResolver } from './records/resolvers/records-resolver';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Records,
    title: 'Records',
    resolve: {
      records: RecordsResolver
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
