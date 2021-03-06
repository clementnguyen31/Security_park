import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContratsFormComponent } from '../contrats-form/contrats-form.component';
import { Contrats } from 'src/app/shared/contrats.model';
import { EnginsService } from 'src/app/shared/engins.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { response } from 'express';
import { element } from 'protractor';
import { MatPaginator } from '@angular/material/paginator';
import { ContratsModalComponent } from '../contrats-modal/contrats-modal.component';

@Component({
  selector: 'app-contrats-list',
  templateUrl: './contrats-list.component.html',
  styleUrls: ['./contrats-list.component.css']
})
export class ContratsListComponent implements OnInit {

  ELEMENT_DATA: Contrats[]
  displayedColumns = ['Lieu', "Type d'engin", 'DureeContrat', 'Date de signature Irrijardin', 'Modifier', 'Details'];
  dataSource = new MatTableDataSource<Contrats>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  currentContratInfo: any = {};

  constructor(public service: ContratsService,
    public enginservice: EnginsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.filterContrat('Attente');
  }

  filterContrat(val){
    this.dataSource.filter = val.trim().toLowerCase();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getAllData() {
    let resp = this.service.getContrats().subscribe(report => this.dataSource.data = report as Contrats[]);
  }

  editForm(selectedRecord) {
    this.service.formDataContrat = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

  ajouterContrat() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

  detailsContrat(idengin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { idengin };
    this.dialog.open(ContratsModalComponent, dialogConfig);
  }

}
