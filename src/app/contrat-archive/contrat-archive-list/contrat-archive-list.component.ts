import { Component, OnInit, ViewChild } from '@angular/core';
import { Contrats } from 'src/app/shared/contrats.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EnginsService } from 'src/app/shared/engins.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContratsFormComponent } from 'src/app/contrats/contrats-form/contrats-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { ContratArchiveModalComponent } from '../contrat-archive-modal/contrat-archive-modal.component';

@Component({
  selector: 'app-contrat-archive-list',
  templateUrl: './contrat-archive-list.component.html',
  styleUrls: ['./contrat-archive-list.component.css']
})
export class ContratArchiveListComponent implements OnInit {

  ELEMENT_DATA : Contrats[]
  displayedColumns: string[] = ['NumContrat', 'DateEntree', 'DureeContrat', 'DateFinContrat', 'Matricule', 'Modifier', 'Details'];
  dataSource = new MatTableDataSource<Contrats>(this.ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public service: ContratsService,
    public enginservice: EnginsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
    this.service.refreshContratListe();
    this.enginservice.refreshListEngins();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.filterContrat('Archive');
  }
  
  filterContrat(val){
    this.dataSource.filter = val.trim().toLowerCase();
  }

  getAllData(){
    let resp = this.service.getContrats().subscribe(report => this.dataSource.data = report as Contrats[]);
  }

  detailsContrat(id, idengin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { id, idengin};
    this.dialog.open(ContratArchiveModalComponent, dialogConfig);
  }

  editForm(selectedRecord) {
    this.service.formDataContrat = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

}
