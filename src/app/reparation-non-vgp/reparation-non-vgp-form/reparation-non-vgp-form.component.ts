import { Component, OnInit, Inject } from '@angular/core';
import { ReparationNonvgpService } from 'src/app/shared/reparation-nonvgp.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reparation-non-vgp-form',
  templateUrl: './reparation-non-vgp-form.component.html',
  styleUrls: ['./reparation-non-vgp-form.component.css']
})
export class ReparationNonVgpFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public reparationNonVgpService: ReparationNonvgpService,  
    private toastr: ToastrService,
    public dialogbox: MatDialogRef<ReparationNonVgpFormComponent>) { }

  ngOnInit(): void {
    this.resetForm();
    console.log(this.data.idengin);
  }

  updateForm(form: NgForm) {
    this.reparationNonVgpService.putReparationsNonVgp().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("La réparation a été correctement modifié", 'Security Park');
        this.reparationNonVgpService.refreshListReparationsNonVgp();
      }
    )
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.reparationNonVgpService.formDataReparationNonVgp = {
      IdReparationNonVgp: 0,
      PrestataireVerification: '',
      DateDevis: null,
      DateDemandeResponse: null,
      MontantDevis: 0,
      DateValidationDevis: null,
      DateTravauxConformite: null,
      DateFacture: null,
      MontantFacture: 0,
      DateValidationFacture: null,
      TypeIntervention: '',
      IdEngin: this.data.idengin
    }
  }

  insertForm(form: NgForm) {
    this.reparationNonVgpService.postReparationsNonVgp().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("La réparation a été correctement ajouté", 'Security Park');
        this.reparationNonVgpService.refreshListReparationsNonVgp();
      }
    )
  }

  onSubmit(form: NgForm) {
    if (this.reparationNonVgpService.formDataReparationNonVgp.IdReparationNonVgp == 0)
      this.insertForm(form);
    else
      this.updateForm(form);
  }

  onClose() {
    this.dialogbox.close();
  }

}
