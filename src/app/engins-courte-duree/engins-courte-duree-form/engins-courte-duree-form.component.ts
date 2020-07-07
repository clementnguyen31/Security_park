import { Component, OnInit } from '@angular/core';
import { EnginsService } from 'src/app/shared/engins.service';
import { NgForm } from '@angular/forms';
import { Engins } from 'src/app/shared/engins.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { ContratsService } from 'src/app/shared/contrats.service';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';

@Component({
  selector: 'app-engins-courte-duree-form',
  templateUrl: './engins-courte-duree-form.component.html',
  styleUrls: ['./engins-courte-duree-form.component.css']
})
export class EnginsCourteDureeFormComponent implements OnInit {

  constructor(public enginService: EnginsService, private toastr: ToastrService, public dialogbox: MatDialogRef<EnginsCourteDureeFormComponent>, public contratService: ContratsService, public contratVGPService: ContratVGPService) { }

  ngOnInit(): void {
    this.contratService.refreshContratListe();
    this.contratVGPService.refreshListContratsVGP();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.enginService.formDataEngins = {
      IdEngin: 0,
      Matricule: null,
      NumSerie: null,
      EstDeclareRentre: '',
      EstDeclareSortie: '',
      DateDeclarationEntree: '',
      DateDeclarationSortie: '',
      Marque: '',
      TypeContrat: '',
      TypeEngin: '',
      TypeBatterie: '',
      PeriodiciteVgp: null,
      EstVgp: false,
      DateCirculation: null,
      IdContrat: 0,
      IdContratVgp: 0,
      InterventionEnCours: false,
      EstArret: false,
    }
  }

  updateForm(form: NgForm) {
    this.enginService.putEngins().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("L'engin a été correctement modifié", 'Security Park');
        this.enginService.refreshListEngins();
      }
    )
  }

  insertForm(form: NgForm) {
    this.enginService.postEngins().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("L'engin a été ajouté", 'Security Park');
        this.enginService.refreshListEngins();
      }
    )
  }

  onSubmit(form: NgForm) {
    if (this.enginService.formDataEngins.IdEngin == 0)
      this.insertForm(form);
    else
      this.updateForm(form);
  }

  onClose() {
    this.dialogbox.close();
  }

}
