import { Component, OnInit, ViewChild } from '@angular/core';
import { EnginsService } from 'src/app/shared/engins.service';
import { Engins } from 'src/app/shared/engins.model';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnginsCourteDureeFormComponent } from '../engins-courte-duree-form/engins-courte-duree-form.component';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EcheanciersService } from 'src/app/shared/echeanciers.service';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Echeanciers } from 'src/app/shared/echeanciers.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EcheanciersComponent } from 'src/app/echeanciers/echeanciers.component';
import { MatPaginator } from '@angular/material/paginator';
import { InterventionsFormComponent } from 'src/app/interventions/interventions-form/interventions-form.component';
import { Interventions } from 'src/app/shared/interventions.model';
import { InterventionsService } from 'src/app/shared/interventions.service';
import { ReparationFormComponent } from 'src/app/reparation/reparation-form/reparation-form.component';
import { EnginsCourteDureeModalComponent } from './engins-courte-duree-modal/engins-courte-duree-modal.component';

@Component({
  selector: 'app-engins-courte-duree-list',
  templateUrl: './engins-courte-duree-list.component.html',
  styleUrls: ['./engins-courte-duree-list.component.css']
})
export class EnginsCourteDureeListComponent implements OnInit {

  ELEMENT_DATA: Engins[];
  displayedColumns: string[] = ['Matricule', 'TypeEngin', 'LieuUtilisation', 'DateProchaineVgp', 'InterventionEnCours', 'EstArret', 'Modifier', 'Details', 'Echeancier', 'Intervention'];
  dataSource = new MatTableDataSource<Engins>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  constructor(public enginservice: EnginsService,
    public contratservice: ContratsService,
    public contratVGPService: ContratVGPService,
    public echeancierService: EcheanciersService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public interventionService: InterventionsService) { }

  ngOnInit(): void {
    this.echeancierService.refreshListEcheanciers();
    this.enginservice.refreshListEngins();
    this.contratservice.refreshContratListe();
    this.interventionService.refreshListInterventionVgps();
    this.getAllData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter('LCD');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllData() {
    let resp = this.enginservice.getEngins().subscribe(report =>
      this.dataSource.data = report as Engins[]);

  }

  populateForm(selectedRecord) {
    this.enginservice.formDataEngins = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EnginsCourteDureeFormComponent, dialogConfig);
  }

  ajouterEngin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EnginsCourteDureeFormComponent, dialogConfig);
  }

  addIntervention(idengin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { idengin };
    const dialogRef = this.dialog.open(InterventionsFormComponent, dialogConfig);
  }


  echeancierModal(idengin, matricule, lieu, datedebut, duree){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { idengin, matricule, lieu, datedebut, duree};
    const dialogRef = this.dialog.open(EcheanciersComponent, dialogConfig);
  } 

  detailsInfo(id, idcontrat) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { id, idcontrat};
    const dialogRef = this.dialog.open(EnginsCourteDureeModalComponent, dialogConfig);
  }

  onDelete(id) {
    this.enginservice.deleteEngins(id).subscribe(res => {
      this.enginservice.refreshListEngins();
    })
  }

}
