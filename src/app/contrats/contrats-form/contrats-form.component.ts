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
  }

  resetForm(form? : NgForm){
    if(form = null){
      form.resetForm();
    }
    this.service.formDataContrat = {
      IdContrat : 0,
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


  onSubmit(form : NgForm){
    if(this.service.formDataContrat.IdContrat == 0){
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm){
    this.service.postContrats().subscribe(
      res => {
        debugger;
        this.resetForm(form);
        this.service.refreshContratListe();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm){
    this.service.putContrats().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshContratListe();
      },
      err => {
        console.log(err);
      }
    )
  }
}
