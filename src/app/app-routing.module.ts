import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContainerComponent } from './page-container/page-container.component';
import { EnginsCourteDureeComponent } from './engins-courte-duree/engins-courte-duree.component';
import { EnginsLongueDureeComponent } from './engins-longue-duree/engins-longue-duree.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { AdministrationComponent } from './administration/administration.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ExportXmlComponent } from './export-xml/export-xml.component';
import { ContratVGPService } from './shared/contrat-vgp.service';
import { ContratValideComponent } from './contrat-valide/contrat-valide.component';
import { ContratArchiveComponent } from './contrat-archive/contrat-archive.component';


const routes: Routes = [
  { path: '', component: PageContainerComponent, children: [
    { path: 'page-1', component: EnginsCourteDureeComponent},
    { path: 'page-2', component: EnginsLongueDureeComponent},
    { path: 'page-3', component: ContratsComponent},
    { path: 'page-4', component: ContratValideComponent},
    { path: 'page-5', component: ContratArchiveComponent},
    { path: 'page-6', component: AdministrationComponent},
    { path: 'page-7', component: ExportXmlComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
