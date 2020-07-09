import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { EnginsService } from 'src/app/shared/engins.service';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EcheanciersService } from 'src/app/shared/echeanciers.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnginsLongueDureeFormComponent } from '../engins-longue-duree-form/engins-longue-duree-form.component';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Echeanciers } from 'src/app/shared/echeanciers.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Engins } from 'src/app/shared/engins.model';
import { InterventionsFormComponent } from 'src/app/interventions/interventions-form/interventions-form.component';
import { Interventions } from 'src/app/shared/interventions.model';
import { InterventionsService } from 'src/app/shared/interventions.service';
import { EcheanciersComponent } from 'src/app/echeanciers/echeanciers.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-engins-longue-duree-list',
  templateUrl: './engins-longue-duree-list.component.html',
  styleUrls: ['./engins-longue-duree-list.component.css']
})
export class EnginsLongueDureeListComponent implements OnInit {

  ELEMENT_DATA: Engins[];
  displayedColumns = ['Matricule', 'TypeEngin', 'LieuUtilisation', 'DateProchaineVgp', 'InterventionEnCours', 'EstArret', 'Modifier', 'Details', 'Echeancier', 'Intervention'];
  dataSource = new MatTableDataSource<Engins>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  currentEnginInfo: any = {};
  currentEnginContrat: any = {};
  currentEnginContratVGP: any = {};
  echeanciersByIdEngin: Echeanciers[];
  interventionByIdEngin: Interventions[];

  constructor(public enginservice: EnginsService, public contratservice: ContratsService, public contratVGPService: ContratVGPService, public echeancierService: EcheanciersService, public contratvgpservice: ContratVGPService, private dialog: MatDialog, private toastr: ToastrService, public interventionService: InterventionsService) { }

  ngOnInit(): void {
    this.enginservice.refreshListEngins();
    this.contratservice.refreshContratListe();
    this.contratvgpservice.refreshListContratsVGP();
    this.echeancierService.refreshListEcheanciers();
    this.interventionService.refreshListInterventionVgps();
    this.getAllData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter('LLD');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllData() {
    let resp = this.enginservice.getEngins().subscribe(report => this.dataSource.data = report as Engins[]);
  }

  populateForm(selectedRecord) {
    this.enginservice.formDataEngins = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EnginsLongueDureeFormComponent, dialogConfig);
  }

  ajouterEngin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EnginsLongueDureeFormComponent, dialogConfig);
  }

  addIntervention(idengin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { idengin };
    const dialogRef = this.dialog.open(InterventionsFormComponent, dialogConfig);
  }

  detailsInfo(id, idcontrat, idcontratvgp) {
    this.enginservice.getEngin(id).subscribe(res => {
      this.currentEnginInfo = res;
    });
    this.contratservice.getContrat(idcontrat).subscribe(res => {
      this.currentEnginContrat = res;
    });
    this.contratvgpservice.getContratVGP(idcontratvgp).subscribe(res => {
      this.currentEnginContratVGP = res;
    });
  }

  /* echeancierInfo(id) {
     this.enginservice.getEngin(id).subscribe(res => {
       this.currentEnginInfo = res;
     });
     this.echeancierService.getEcheanciersByIdEngin(id).subscribe(res => {
       this.echeanciersByIdEngin = res;
     })
     this.interventionService.getInterventionVgpsByIdEngin(id).subscribe(res => {
       this.interventionByIdEngin = res;
     })
   } */

  echeancierModal(idengin, matricule, lieu, datedebut, duree) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { idengin, matricule, lieu, datedebut, duree };
    const dialogRef = this.dialog.open(EcheanciersComponent, dialogConfig);
  }

  onDelete(id) {
    this.enginservice.deleteEngins(id).subscribe(res => {
      this.enginservice.refreshListEngins();
    })
  }

}