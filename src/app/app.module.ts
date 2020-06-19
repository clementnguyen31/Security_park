import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageContainerComponent } from './page-container/page-container.component';
import { AdministrationComponent } from './administration/administration.component';
import { ContratsCompletComponent } from './contrats-complet/contrats-complet.component';
import { ContratsEnCoursComponent } from './contrats-en-cours/contrats-en-cours.component';
import { EnginsCourteDureeComponent } from './engins-courte-duree/engins-courte-duree.component';
import { EnginsLongueDureeComponent } from './engins-longue-duree/engins-longue-duree.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { EnginsCourteDureeFormComponent } from './engins-courte-duree/engins-courte-duree-form/engins-courte-duree-form.component';
import { EnginsCourteDureeListComponent } from './engins-courte-duree/engins-courte-duree-list/engins-courte-duree-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { EnginsLongueDureeFormComponent } from './engins-longue-duree/engins-longue-duree-form/engins-longue-duree-form.component';
import { EnginsLongueDureeListComponent } from './engins-longue-duree/engins-longue-duree-list/engins-longue-duree-list.component';
import { EcheanciersComponent } from './echeanciers/echeanciers.component';
import { EcheanciersListComponent } from './echeanciers/echeanciers-list/echeanciers-list.component';
import { EcheanciersFormComponent } from './echeanciers/echeanciers-form/echeanciers-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageContainerComponent,
    AdministrationComponent,
    ContratsCompletComponent,
    ContratsEnCoursComponent,
    EnginsCourteDureeComponent,
    EnginsLongueDureeComponent,
    InterventionsComponent,
    EnginsCourteDureeFormComponent,
    EnginsCourteDureeListComponent,
    EnginsLongueDureeFormComponent,
    EnginsLongueDureeListComponent,
    EcheanciersComponent,
    EcheanciersListComponent,
    EcheanciersFormComponent
  ],
  entryComponents: [EnginsCourteDureeFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: MatDialogRef,
    useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
