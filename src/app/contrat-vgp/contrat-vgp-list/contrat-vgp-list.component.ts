import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ContratVgpFormComponent } from '../contrat-vgp-form/contrat-vgp-form.component';
import { ContratVGP } from 'src/app/shared/contrat-vgp.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-contrat-vgp-list',
  templateUrl: './contrat-vgp-list.component.html',
  styleUrls: ['./contrat-vgp-list.component.css']
})
export class ContratVgpListComponent implements OnInit {

  ELEMENT_DATA: ContratVGP[];
  displayedColumns = ['NumVgp', 'DateDebutVgp', 'DateProchaineVgp', 'DureeVgp', 'MontantVisite', 'Modifier'];
  dataSource = new MatTableDataSource<ContratVGP>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public contratvgpservice: ContratVGPService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.contratvgpservice.refreshListContratsVGP();
    this.getAllData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllData() {
    let resp = this.contratvgpservice.getContratsVGP().subscribe(report => this.dataSource.data = report as ContratVGP[]);
  }

  modifierVGP(selectedRecord){
    this.contratvgpservice.formDataContratVGP = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ContratVgpFormComponent, dialogConfig);
  }

}
