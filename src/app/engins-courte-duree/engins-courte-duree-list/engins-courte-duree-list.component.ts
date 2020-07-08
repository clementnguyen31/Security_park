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

@Component({
  selector: 'app-engins-courte-duree-list',
  templateUrl: './engins-courte-duree-list.component.html',
  styleUrls: ['./engins-courte-duree-list.component.css']
})
export class EnginsCourteDureeListComponent implements OnInit {

  ELEMENT_DATA: Engins[];
  displayedColumns: string[] = ['Matricule', 'TypeEngin', 'LieuUtilisation', 'InterventionEnCours', 'EstArret', 'Modifier', 'Details', 'Echeancier'];
  dataSource = new MatTableDataSource<Engins>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentContratInfo: any = {};

  currentEnginInfo: any = {};
  currentEnginContrat: any = {};
  currentEnginEcheancier: any = {};
  echeanciersByIdEngin: Echeanciers[];

  constructor(public enginservice: EnginsService,
    public contratservice: ContratsService,
    public contratVGPService: ContratVGPService,
    public echeancierService: EcheanciersService,
    private dialog: MatDialog,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.echeancierService.refreshListEcheanciers();
    this.enginservice.refreshListEngins();
    this.contratservice.refreshContratListe();
    this.getAllData();
    this.dataSource.sort = this.sort;
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

  echeancierModal(idengin, matricule, lieu, datedebut, duree){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { idengin, matricule, lieu, datedebut, duree};
    const dialogRef = this.dialog.open(EcheanciersComponent, dialogConfig);
  } 

  detailsInfo(id, idcontrat) {
    this.enginservice.getEngin(id).subscribe(res => {
      this.currentEnginInfo = res;
    });
    this.contratservice.getContrat(idcontrat).subscribe(res => {
      this.currentEnginContrat = res;
    });
  }

  onDelete(id) {
    this.enginservice.deleteEngins(id).subscribe(res => {
      this.enginservice.refreshListEngins();
    })
  }

}
