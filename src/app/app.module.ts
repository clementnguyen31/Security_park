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
  ],
  entryComponents: [EnginsCourteDureeFormComponent,
    ContratsFormComponent],
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
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
