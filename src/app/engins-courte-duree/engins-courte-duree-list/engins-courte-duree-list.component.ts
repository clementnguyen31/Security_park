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
import { ToastrService } from 'ngx-toastr';
import { Echeanciers } from 'src/app/shared/echeanciers.model';

@Component({
  selector: 'app-engins-courte-duree-list',
  templateUrl: './engins-courte-duree-list.component.html',
  styleUrls: ['./engins-courte-duree-list.component.css']
})
export class EnginsCourteDureeListComponent implements OnInit {

  currentEnginInfo: any = {};
  currentEnginContrat: any = {};
  currentEnginEcheancier : any = {};
  echeanciersByIdEngin : Echeanciers[];
  echancierId : any = {};

  constructor(public enginservice: EnginsService, public contratservice: ContratsService, public echeancierService : EcheanciersService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.enginservice.refreshListEngins();
    this.echeancierService.refreshListEcheanciers();
  }

  resetFormEcheancier(form?: NgForm){
    if(form != null){
      form.form.reset();
    }
    this.echeancierService.formDataEcheancier = {
      IdEcheancier : 0,
      MoisEcheancier : '',
      Montant : 0,
      IdEngin : this.currentEnginInfo.IdInfo
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
    this.echeancierService.getEcheanciersByIdEngin(id).subscribe(res =>
      {
        this.echeanciersByIdEngin = res;
      })
  }

  onDelete(id){
    this.enginservice.deleteEngins(id).subscribe(res => {
      this.enginservice.refreshListEngins();
    })
  }

  insertEcheancier(form: NgForm){
    this.echeancierService.postEcheanciers().subscribe(
      res => {
        this.resetFormEcheancier(form);
        this.toastr.success("Ajout réussi", 'Security Park');
        this.echeancierService.refreshListEcheanciers();
      },
      err => { console.log(err);}
    )
  }

  onSubmitEcheancier(form: NgForm){
    this.insertEcheancier(form);
  }

}
