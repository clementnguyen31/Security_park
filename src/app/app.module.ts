import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageContainerComponent } from './page-container/page-container.component';
import { AdministrationComponent } from './administration/administration.component'
import { EnginsCourteDureeComponent } from './engins-courte-duree/engins-courte-duree.component';
import { EnginsLongueDureeComponent } from './engins-longue-duree/engins-longue-duree.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { EnginsCourteDureeFormComponent } from './engins-courte-duree/engins-courte-duree-form/engins-courte-duree-form.component';
import { EnginsCourteDureeListComponent } from './engins-courte-duree/engins-courte-duree-list/engins-courte-duree-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { EnginsLongueDureeFormComponent } from './engins-longue-duree/engins-longue-duree-form/engins-longue-duree-form.component';
import { EnginsLongueDureeListComponent } from './engins-longue-duree/engins-longue-duree-list/engins-longue-duree-list.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ContratsListComponent } from './contrats/contrats-list/contrats-list.component';
import { ContratsFormComponent } from './contrats/contrats-form/contrats-form.component';
import { EcheanciersService } from './shared/echeanciers.service';
import { ExportXmlComponent } from './export-xml/export-xml.component';
import { ContratValideComponent } from './contrat-valide/contrat-valide.component';
import { ContratValideListComponent } from './contrat-valide/contrat-valide-list/contrat-valide-list.component';
import { MatSortModule } from '@angular/material/sort';
import { ContratArchiveComponent } from './contrat-archive/contrat-archive.component';
import { ContratArchiveListComponent } from './contrat-archive/contrat-archive-list/contrat-archive-list.component';
import { InterventionsFormComponent } from './interventions/interventions-form/interventions-form.component';
import { ContratVgpComponent } from './contrat-vgp/contrat-vgp.component';
import { ContratVgpFormComponent } from './contrat-vgp/contrat-vgp-form/contrat-vgp-form.component';
import { ContratVGPService } from './shared/contrat-vgp.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EcheanciersComponent } from './echeanciers/echeanciers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ContratPipe } from './shared/contrat-pipe';
import { ContratVgpListComponent } from './contrat-vgp/contrat-vgp-list/contrat-vgp-list.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ReparationComponent } from './reparation/reparation.component';
import { ReparationListeComponent } from './reparation/reparation-liste/reparation-liste.component';
import { ReparationFormComponent } from './reparation/reparation-form/reparation-form.component';
import { EnginsCourteDureeModalComponent } from './engins-courte-duree/engins-courte-duree-list/engins-courte-duree-modal/engins-courte-duree-modal.component';
import { EnginsLonguesDureeModalComponent } from './engins-longue-duree/engins-longue-duree-list/engins-longues-duree-modal/engins-longues-duree-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PageContainerComponent,
    AdministrationComponent,
    EnginsCourteDureeComponent,
    EnginsLongueDureeComponent,
    InterventionsComponent,
    EnginsCourteDureeFormComponent,
    EnginsCourteDureeListComponent,
    EnginsLongueDureeFormComponent,
    EnginsLongueDureeListComponent,
    ContratsComponent,
    ContratsListComponent,
    ContratsFormComponent,
    ExportXmlComponent,
    ContratValideComponent,
    ContratValideListComponent,
    ContratArchiveComponent,
    ContratArchiveListComponent,
    InterventionsFormComponent,
    ContratVgpComponent,
    ContratVgpFormComponent,
    EcheanciersComponent,
    ContratPipe,
    ContratVgpListComponent,
    ReparationComponent,
    ReparationListeComponent,
    ReparationFormComponent,
    EnginsCourteDureeModalComponent,
    EnginsLonguesDureeModalComponent
  ],
  entryComponents: [EnginsCourteDureeFormComponent,
    ContratsFormComponent, ContratVGPService, InterventionsFormComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    FilterPipeModule
  ],
  providers: [
    EcheanciersService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
