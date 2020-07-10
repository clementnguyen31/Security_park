import { Component, OnInit, Inject } from '@angular/core';
import { ReparationService } from 'src/app/shared/reparation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reparation-form',
  templateUrl: './reparation-form.component.html',
  styleUrls: ['./reparation-form.component.css']
})
export class ReparationFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public serviceReparation: ReparationService,
  private toastr: ToastrService,
  public dialogbox: MatDialogRef<ReparationFormComponent>) { }

  ngOnInit(): void {
    this.resetForm();
  }

  updateForm(form: NgForm) {
    this.serviceReparation.putReparations().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("La réparation a été correctement modifié", 'Security Park');
        this.serviceReparation.refreshListReparations();
      }
    )
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.serviceReparation.formDataReparation = {
      IdReparation: 0,
      PrestataireVerfifcation: '',
      DateDevis: null,
      DateDemandeReponse: null,
      MontantDevis: 0,
      DateValidationDevis: null,
      DateTravauxConformite: null,
      DateFacture: null,
      MontantFacture: 0,
      DateValidationFacture: null,
      TypeIntervention: '',
      IdInterventionVgp: this.data.idIntervention
    }
  }

  insertForm(form: NgForm) {
    this.serviceReparation.postReparations().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("La réparation a été correctement ajouté", 'Security Park');
        this.serviceReparation.refreshListReparations();
      }
    )
  }

  onSubmit(form: NgForm) {
    if (this.serviceReparation.formDataReparation.IdReparation == 0)
      this.insertForm(form);
    else
      this.updateForm(form);
  }

  onClose() {
    this.dialogbox.close();
  }

}
