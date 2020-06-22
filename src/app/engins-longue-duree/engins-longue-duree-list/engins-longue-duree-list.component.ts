import { Component, OnInit } from '@angular/core';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { EnginsService } from 'src/app/shared/engins.service';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EcheanciersService } from 'src/app/shared/echeanciers.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnginsLongueDureeFormComponent } from '../engins-longue-duree-form/engins-longue-duree-form.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-engins-longue-duree-list',
  templateUrl: './engins-longue-duree-list.component.html',
  styleUrls: ['./engins-longue-duree-list.component.css']
})
export class EnginsLongueDureeListComponent implements OnInit {

  currentEnginInfo: any = {};
  currentEnginContrat: any = {};
  currentEnginContratVGP: any = {};
  currentEnginEcheancier : any = {};

  constructor(public enginservice: EnginsService, public contratservice: ContratsService, public echeancierService : EcheanciersService, public contratvgpservice : ContratVGPService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.enginservice.refreshListEngins();
    this.contratservice.refreshListContrats();
    this.contratvgpservice.refreshListContratsVGP();
  }

  resetFormEcheancier(form?: NgForm){
    if(form != null){
      form.form.reset();
    }
    this.echeancierService.formDataEcheancier = {
      IdEcheancier : 0,
      MoisEcheancier : '',
      Montant : '',
      IdEngin : 0
    }
  }

  populateForm(selectedRecord){
    this.enginservice.formDataEngins = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EnginsLongueDureeFormComponent, dialogConfig);
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
    this.contratvgpservice.getContratVGP(id).subscribe(res =>
      {
        this.currentEnginContratVGP = res;
      })
  } 

  onDelete(id){
    this.enginservice.deleteEngins(id).subscribe(res => {
      this.enginservice.refreshListEngins();
    })
  }

}
