import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EnginsService } from 'src/app/shared/engins.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContratsFormComponent } from 'src/app/contrats/contrats-form/contrats-form.component';
import { Contrats } from 'src/app/shared/contrats.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ContratsModalComponent } from 'src/app/contrats/contrats-modal/contrats-modal.component';


@Component({
  selector: 'app-contrat-valide-list',
  templateUrl: './contrat-valide-list.component.html',
  styleUrls: ['./contrat-valide-list.component.css']
})
export class ContratValideListComponent implements OnInit {

  ELEMENT_DATA: Contrats[]
  //tous les colonnes
  displayedColumns: string[] = ['NumContrat', 'Matricule', 'TypeEngin', 'LieuUtilisation', 'DateEntree', 'DureeContrat', 'DateFinContrat', 'Modifier', 'Details'];
  //initialisation dun tableau 
  dataSource = new MatTableDataSource<Contrats>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  currentContratInfo: any = {};

  constructor(public service: ContratsService,
    public enginservice: EnginsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
    this.service.refreshContratListe();
    this.enginservice.refreshListEngins();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.filterContrat('Valide');
  }

  filterContrat(val) {
    this.dataSource.filter = val.trim().toLowerCase();
  }

  getAllData() {
    let resp = this.service.getContrats().subscribe(report => this.dataSource.data = report as Contrats[]);
  }

  detailsContrat(idengin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { idengin };
    this.dialog.open(ContratsModalComponent, dialogConfig);
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
