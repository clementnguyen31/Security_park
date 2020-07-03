import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EnginsService } from 'src/app/shared/engins.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContratsFormComponent } from 'src/app/contrats/contrats-form/contrats-form.component';
import { Contrats } from 'src/app/shared/contrats.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-contrat-valide-list',
  templateUrl: './contrat-valide-list.component.html',
  styleUrls: ['./contrat-valide-list.component.css']
})
export class ContratValideListComponent implements OnInit {

  ELEMENT_DATA : Contrats[]
  displayedColumns: string[] = ['NumContrat', 'DateEntree', 'DureeContrat', 'DateFinContrat', 'Matricule', 'Modifier', 'Details'];
  dataSource = new MatTableDataSource<Contrats>(this.ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  currentContratInfo: any = {};

  constructor(public service: ContratsService,
    public enginservice: EnginsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
    this.service.refreshContratListe();
    this.enginservice.refreshListEngins();
    this.dataSource.sort = this.sort;
  }

  getAllData(){
    let resp = this.service.getContrats().subscribe(report => this.dataSource.data = report as Contrats[]);
  }

  detailsContrat(id) {
    this.service.getContrat(id).subscribe(res => {
      this.currentContratInfo = res;
    })
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
