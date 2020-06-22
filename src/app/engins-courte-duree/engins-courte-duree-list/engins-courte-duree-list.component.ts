import { Component, OnInit } from '@angular/core';
import { EnginsService } from 'src/app/shared/engins.service';
import { Engins } from 'src/app/shared/engins.model';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnginsCourteDureeFormComponent } from '../engins-courte-duree-form/engins-courte-duree-form.component';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EcheanciersService } from 'src/app/shared/echeanciers.service';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-engins-courte-duree-list',
  templateUrl: './engins-courte-duree-list.component.html',
  styleUrls: ['./engins-courte-duree-list.component.css']
})
export class EnginsCourteDureeListComponent implements OnInit {

  currentEnginInfo: any = {};
  currentEnginContrat: any = {};
  currentEnginEcheancier : any = {};

  constructor(public enginservice: EnginsService, public contratservice: ContratsService, public echeancierService : EcheanciersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.enginservice.refreshListEngins();
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

  echeancierInfo(id){
    this.enginservice.getEngin(id).subscribe(res =>
      {
        this.currentEnginInfo = res;
      });
    this.echeancierService.getEcheancier(id).subscribe(res =>
      {
        this.currentEnginEcheancier = res;
      });
  }

  onDelete(id){
    this.enginservice.deleteEngins(id).subscribe(res => {
      this.enginservice.refreshListEngins();
    })
  }

  insertEcheancier(form: NgForm){
    this.echeancierService.addEcheanciers(form.value).subscribe(res=>
      {
        this.resetFormEcheancier(form)
      })
  }

  onSubmitEcheancier(form: NgForm){
    if(this.echeancierService.formDataEcheancier.IdEcheancier == 0){
      this.insertEcheancier(form);
    }
  }

}
