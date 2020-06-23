import { Component, OnInit, Inject } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Contrats } from 'src/app/shared/contrats.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contrats-form',
  templateUrl: './contrats-form.component.html',
  styleUrls: ['./contrats-form.component.css']
})
export class ContratsFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ContratsFormComponent>,
    public service: ContratsService) { }

  ngOnInit(): void {
    if(this.data.IdContrat == null)
      this.service.formDataContrat = {
        IdContrat : this.data.IdContrat,
        DureeContrat : '',
        DateFinContrat : '',
        DateEntree : '',
        PrixLoyer : 0,
        LieuUtilisation : '',
        DateSignatureIrrijardin : null,
        NumContrat : '',
        PrestataireLocation : '',
        TypeEngin : '',
        DateSignaturePrestataire : null,
        DateCirculation : null
      }
      else
      this.service.formDataContrat = Object.assign({}, this.data.IdContrat);
  }

  resetForm(form? : NgForm){
    if(form = null){
      form.resetForm();
    }
    this.service.formDataContrat = {
      IdContrat : null,
      DureeContrat : '',
      DateFinContrat : '',
      DateEntree : '',
      PrixLoyer : 0,
      LieuUtilisation : '',
      DateSignatureIrrijardin : null,
      NumContrat : '',
      PrestataireLocation : '',
      TypeEngin : '',
      DateSignaturePrestataire : null,
      DateCirculation : null
    }
  }

  updateForm(form: NgForm){
    this.service.putContrats().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshListContrats();
      }
    );
  }

  insertForm(form: NgForm){
    this.service.postContrats().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshListContrats();
      }
    )
  }

  onSubmit(form : NgForm){
   if(this.service.formDataContrat.IdContrat == null)
      this.insertForm(form);
    else
      this.updateForm(form);
  }
}
