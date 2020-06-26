import { Component, OnInit } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContratsFormComponent } from '../contrats-form/contrats-form.component';
import { Contrats } from 'src/app/shared/contrats.model';
import { EnginsService } from 'src/app/shared/engins.service';

@Component({
  selector: 'app-contrats-list',
  templateUrl: './contrats-list.component.html',
  styleUrls: ['./contrats-list.component.css']
})
export class ContratsListComponent implements OnInit {

  currentContratInfo: any = {};

  constructor(public service: ContratsService,
    public enginservice: EnginsService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.service.refreshContratListe();
  }

  editForm(selectedRecord){
    this.service.formDataContrat = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

  ajouterContrat(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

  detailsContrat(id){
    this.service.getContrat(id).subscribe(res =>
      {
        this.currentContratInfo = res;
      })
  }

}
