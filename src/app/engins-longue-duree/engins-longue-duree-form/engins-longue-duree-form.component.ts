import { Component, OnInit } from '@angular/core';
import { EnginsService } from 'src/app/shared/engins.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ContratsService } from 'src/app/shared/contrats.service';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { ContratVgpFormComponent } from 'src/app/contrat-vgp/contrat-vgp-form/contrat-vgp-form.component';
import { ContratVgpListComponent } from 'src/app/contrat-vgp/contrat-vgp-list/contrat-vgp-list.component';
import { Engins } from 'src/app/shared/engins.model';
import { Contrats } from 'src/app/shared/contrats.model';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-engins-longue-duree-form',
  templateUrl: './engins-longue-duree-form.component.html',
  styleUrls: ['./engins-longue-duree-form.component.css']
})
export class EnginsLongueDureeFormComponent implements OnInit {

  constructor(public enginService: EnginsService, private toastr: ToastrService, private dialog: MatDialog, public dialogbox: MatDialogRef<EnginsLongueDureeFormComponent>, public contratService: ContratsService, public contratVGPService: ContratVGPService) { }

  contratFilter: any = {EtatContrat: 'Valide'};

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
      Matricule: 0,
      NumSerie: null,
      EstDeclareRentre: '',
      EstDeclareSortie: '',
      DateDeclarationEntree: null,
      DateDeclarationSortie: null,
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
      DateProchaineVgp: null
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

  ajouterContratVGP() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratVgpFormComponent, dialogConfig);
  }

  listeContratVGP() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(ContratVgpListComponent, dialogConfig);
  }

  insertForm(form: NgForm) {
    this.enginService.postEngins().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("L'engin a été correctement ajouté", 'Security Park');
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
