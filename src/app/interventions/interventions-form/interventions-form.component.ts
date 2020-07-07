import { Component, OnInit, Inject } from '@angular/core';
import { InterventionsService } from 'src/app/shared/interventions.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interventions-form',
  templateUrl: './interventions-form.component.html',
  styleUrls: ['./interventions-form.component.css']
})
export class InterventionsFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public serviceIntervention: InterventionsService,
    private toastr: ToastrService,
    public dialogbox: MatDialogRef<InterventionsFormComponent>) { 
      this.serviceIntervention.formDataInterventionVgps.IdEngin = data.IdEngin;
    }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.serviceIntervention.formDataInterventionVgps = {
      IdInterventionVgp: 0,
      DateIntervention: null,
      EstRapportRecu: false,
      PrestataireVerification: '',
      EstSatisfaisant: false,
      Commentaire: '',
      EstSuite: false,
      IdFacture: 0,
      IdEngin: this.data.IdEngin
    }
  }

  updateForm(form: NgForm) {
    this.serviceIntervention.postInterventionVgps().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("L'intervention a été correctement modifié", 'Security Park');
        this.serviceIntervention.refreshListInterventionVgps();
      }
    )
  }

  insertForm(form: NgForm) {
    this.serviceIntervention.postInterventionVgps().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("L'invervention a été correctement ajouté", 'Security Park');
        this.serviceIntervention.refreshListInterventionVgps();
      }
    )
  }

  onSubmit(form: NgForm) {
    if (this.serviceIntervention.formDataInterventionVgps.IdInterventionVgp == 0)
      this.insertForm(form);
    else
      this.updateForm(form);
  }

  onClose() {
    this.dialogbox.close();
  }

}
