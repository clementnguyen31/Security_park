import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EcheanciersService } from '../shared/echeanciers.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Echeanciers } from '../shared/echeanciers.model';
import { EnginsService } from '../shared/engins.service';

@Component({
  selector: 'app-echeanciers',
  templateUrl: './echeanciers.component.html',
  styleUrls: ['./echeanciers.component.css']
})
export class EcheanciersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public echeancierService: EcheanciersService,
  private toastr: ToastrService,
  public enginService: EnginsService,
  public dialogbox: MatDialogRef<EcheanciersComponent>) { }

  echeanciersByIdEngin: Echeanciers[];
  currentEngin: any= {};

  ngOnInit(): void {
    this.resetFormEcheancier();
    this.echeancierService.refreshListEcheanciers();
    this.echeancierService.getEcheanciersByIdEngin(this.data.idengin).subscribe(res => {
      this.echeanciersByIdEngin = res;
    });
    this.enginService.getEngin(this.data.idengin).subscribe(res => {
      this.currentEngin = res;
    })
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
      Matricule: this.data.matricule,
      LieuUtilisation: this.data.lieu,
      DateDebutContrat: this.data.datedebut,
      DureeContrat: this.data.duree
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
