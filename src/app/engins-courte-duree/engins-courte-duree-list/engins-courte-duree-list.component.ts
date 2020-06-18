import { Component, OnInit } from '@angular/core';
import { EnginsService } from 'src/app/shared/engins.service';
import { Engins } from 'src/app/shared/engins.model';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnginsCourteDureeFormComponent } from '../engins-courte-duree-form/engins-courte-duree-form.component';
import { ContratsService } from 'src/app/shared/contrats.service';

@Component({
  selector: 'app-engins-courte-duree-list',
  templateUrl: './engins-courte-duree-list.component.html',
  styleUrls: ['./engins-courte-duree-list.component.css']
})
export class EnginsCourteDureeListComponent implements OnInit {

  currentEnginInfo: any = {};
  currentEnginContrat: any = {};

  constructor(public enginservice: EnginsService, public contratservice: ContratsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.enginservice.refreshListEngins();
  }

  populateForm(selectedRecord){
    this.enginservice.formDataEngins = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EnginsCourteDureeFormComponent, dialogConfig);
  }

  detailsInfo(id){
    this.enginservice.getEngin(id).subscribe(res =>
      {
        this.currentEnginInfo = res;
      });
    this.contratservice.getContrat(id).subscribe(res =>
      {
        this.currentEnginContrat = res;
      });
  } 

}
