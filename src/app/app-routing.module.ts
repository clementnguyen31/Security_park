import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContainerComponent } from './page-container/page-container.component';
import { EnginsCourteDureeComponent } from './engins-courte-duree/engins-courte-duree.component';
import { EnginsLongueDureeComponent } from './engins-longue-duree/engins-longue-duree.component';
import { ContratsEnCoursComponent } from './contrats-en-cours/contrats-en-cours.component';
import { ContratsCompletComponent } from './contrats-complet/contrats-complet.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { AdministrationComponent } from './administration/administration.component';


const routes: Routes = [
  { path: '', component: PageContainerComponent, children: [
    { path: 'page-1', component: EnginsCourteDureeComponent},
    { path: 'page-2', component: EnginsLongueDureeComponent},
    { path: 'page-3', component: ContratsEnCoursComponent},
    { path: 'page-4', component: ContratsCompletComponent},
    { path: 'page-5', component: InterventionsComponent},
    { path: 'page-6', component: AdministrationComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
