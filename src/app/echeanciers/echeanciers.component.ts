import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EcheanciersService } from '../shared/echeanciers.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-echeanciers',
  templateUrl: './echeanciers.component.html',
  styleUrls: ['./echeanciers.component.css']
})
export class EcheanciersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public echeancierService: EcheanciersService,
  private toastr: ToastrService,
  public dialogbox: MatDialogRef<EcheanciersComponent>) { }

  ngOnInit(): void {
    this.resetFormEcheancier();
    this.echeancierService.refreshListEcheanciers();
  }

  resetFormEcheancier(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.echeancierService.formDataEcheancier = {
      IdEcheancier: 0,
      DateEcheancier: null,
      Montant: 0,
      IdEngin: this.data.idengin,
      Matricule: 0
    } 
  }

  insertEcheancier(form: NgForm) {
    this.echeancierService.postEcheanciers().subscribe(
      res => {
        this.resetFormEcheancier(form);
        this.toastr.success("Ajout réussi", 'Security Park');
        this.echeancierService.refreshListEcheanciers();
      },
      err => { console.log(err); }
    )
  }

  onSubmitEcheancier(form: NgForm) {
    this.insertEcheancier(form);
  }

}
