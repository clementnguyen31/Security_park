import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratVGP } from 'src/app/shared/contrat-vgp.model';
import {Output} from '@angular/core';


@Component({
  selector: 'app-contrat-vgp-form',
  templateUrl: './contrat-vgp-form.component.html',
  styleUrls: ['./contrat-vgp-form.component.css']
})
export class ContratVgpFormComponent implements OnInit {

  @Output() childForm = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  public contratvgpservice: ContratVGPService, 
  private toastr: ToastrService, 
  public dialogbox: MatDialogRef<ContratVgpFormComponent>) { }

  ngOnInit(): void {
    this.contratvgpservice.refreshListContratsVGP();

  }

  resetForm(form?: NgForm) {
    this.contratvgpservice.formDataContratVGP = {
      IdContratVgp: 0,
      DateDebutVgp: null,
      DureeVgp: 0,
      MontantVisite: 0,
      DateProchaineVgp: null,
      NumVgp: 0
    }
  }

  insertForm(form: NgForm) {
    this.contratvgpservice.postContratsVGP().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("Le contrat VGP a été correctement ajouté", 'Security Park');
        this.contratvgpservice.refreshListContratsVGP();
      }
    )
  }

  updateForm(form: NgForm){
    this.contratvgpservice.putContratsVGP().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("Le contrat VGP a été correctement modifié", 'Security Park');
        this.contratvgpservice.refreshListContratsVGP();
      }
    )
  }

  onSubmit(form: NgForm) {
    if (this.contratvgpservice.formDataContratVGP.IdContratVgp == 0)
      this.insertForm(form);
    else
      this.updateForm(form);
  }

}
