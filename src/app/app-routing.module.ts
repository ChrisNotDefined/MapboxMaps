import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { MapasModule } from './mapas/mapas.module';

const routes:Routes = [
  {
    path: 'mapas',
    loadChildren:()=>import('./mapas/mapas.module').then(m => m.MapasModule)
  },
  {
    path: '**',
    redirectTo:'mapas'
  }
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
