import { Component, OnInit } from '@angular/core';
import { EnginsService } from 'src/app/shared/engins.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-engins-longue-duree-form',
  templateUrl: './engins-longue-duree-form.component.html',
  styleUrls: ['./engins-longue-duree-form.component.css']
})
export class EnginsLongueDureeFormComponent implements OnInit {

  constructor(public enginService : EnginsService, private toastr: ToastrService, public dialogbox: MatDialogRef<EnginsLongueDureeFormComponent>) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.form.reset();
    }
    this.enginService.formDataEngins = {
      IdEngin : 0,
      Matricule : 0,
      NumSerie : null,
      EstDeclareRentre : '',
      EstDeclareSortie : '',
      DateDeclarationEntree : '',
      DateDeclarationSortie : '',
      Marque : '',
      TypeContrat : '',
      TypeEngin : '',
      TypeBatterie : '',
      PeriodiciteVgp : null,
      EstVgp : false,
      DateCirculation : null,
      IdContrat : 0
    }
  }

  updateForm(form: NgForm){
    this.enginService.putEngins().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("L'engin a été correctement modifié", 'Security Park');
        this.enginService.refreshListEngins();
      }
    )
  }

  insertForm(form: NgForm){
    this.enginService.postEngins().subscribe(
      res => {
        this.resetForm(form);
        this.enginService.refreshListEngins();
      }
    )
  }

  onSubmit(form: NgForm){
    if(this.enginService.formDataEngins.IdEngin == 0)
      this.insertForm(form);
    else
      this.updateForm(form);
  }

  onClose(){
    this.dialogbox.close();
  }

}
