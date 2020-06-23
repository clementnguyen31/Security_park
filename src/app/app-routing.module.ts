import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContainerComponent } from './page-container/page-container.component';
import { EnginsCourteDureeComponent } from './engins-courte-duree/engins-courte-duree.component';
import { EnginsLongueDureeComponent } from './engins-longue-duree/engins-longue-duree.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { AdministrationComponent } from './administration/administration.component';
import { ContratsComponent } from './contrats/contrats.component';


const routes: Routes = [
  { path: '', component: PageContainerComponent, children: [
    { path: 'page-1', component: EnginsCourteDureeComponent},
    { path: 'page-2', component: EnginsLongueDureeComponent},
    { path: 'page-3', component: ContratsComponent},
    { path: 'page-4', component: AdministrationComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
