import { Component, OnInit } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContratsFormComponent } from '../contrats-form/contrats-form.component';
import { Contrats } from 'src/app/shared/contrats.model';

@Component({
  selector: 'app-contrats-list',
  templateUrl: './contrats-list.component.html',
  styleUrls: ['./contrats-list.component.css']
})
export class ContratsListComponent implements OnInit {

  constructor(public service: ContratsService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.service.refreshContratListe();
  }

  populateForm(IdContrat){
    this.service.formDataContrat = Object.assign({}, IdContrat)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

  AddContrat(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratsFormComponent, dialogConfig);
  }

}
