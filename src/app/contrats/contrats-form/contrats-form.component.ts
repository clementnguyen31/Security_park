import { Component, OnInit, Inject } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { Contrats } from 'src/app/shared/contrats.model';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { EnginsService } from 'src/app/shared/engins.service';

@Component({
  selector: 'app-contrats-form',
  templateUrl: './contrats-form.component.html',
  styleUrls: ['./contrats-form.component.css']
})
export class ContratsFormComponent implements OnInit {


  constructor(
    public dialogbox: MatDialogRef<ContratsFormComponent>,
    public service: ContratsService,
    public enginservice: EnginsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formDataContrat = {
      IdContrat: 0,
      DureeContrat: '',
      DateFinContrat: '',
      DateEntree: '',
      PrixLoyer: 0,
      LieuUtilisation: '',
      DateSignatureIrrijardin: null,
      NumContrat: '',
      PrestataireLocation: '',
      TypeEngin: '',
      TypeContrat: '',
      DateSignaturePrestataire: null,
      DateCirculation: null,
      Commentaire: ''
    }
  }

  insertRecord(form: NgForm) {
    this.service.postContrats().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Le contrat a été ajouté', 'Security Park');
        this.service.refreshContratListe();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putContrats().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Le contrat a été modifié', 'Security Park');
        this.service.refreshContratListe();
      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmit(form: NgForm) {
    if (this.service.formDataContrat.IdContrat == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  onClose() {
    this.dialogbox.close();
  }
}
