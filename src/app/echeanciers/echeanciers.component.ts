import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EcheanciersService } from '../shared/echeanciers.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Echeanciers } from '../shared/echeanciers.model';
import { EnginsService } from '../shared/engins.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-echeanciers',
  templateUrl: './echeanciers.component.html',
  styleUrls: ['./echeanciers.component.css']
})
export class EcheanciersComponent implements OnInit {

  ELEMENT_DATA: Echeanciers[];
  displayedColumns: string[] = ['Matricule', 'Date', 'Montant', "Lieu d'utilisation", "Date de début de contrat", "Durée du contrat", 'Modifier'];
  dataSource = new MatTableDataSource<Echeanciers>(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public echeancierService: EcheanciersService,
    private toastr: ToastrService,
    public enginService: EnginsService,
    public dialogbox: MatDialogRef<EcheanciersComponent>) { }

  echeanciersByIdEngin: Echeanciers[];
  currentEngin: any = {};

  ngOnInit(): void {
    this.resetFormEcheancier();
    this.echeancierService.refreshListEcheanciers();
    this.getAllData(this.data.idengin);
    this.enginService.getEngin(this.data.idengin).subscribe(res => {
      this.currentEngin = res;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllData(idengin) {
    let resp = this.echeancierService.getEcheanciersByIdEngin(idengin).subscribe(report =>
      this.dataSource.data = report as Echeanciers[]);
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
        this.toastr.success("L'ajout a été effectué", 'Security Park');
        this.echeancierService.refreshListEcheanciers();
      },
      err => { console.log(err); }
    )
  }

  populateForm(selectedRecord) {
    this.echeancierService.formDataEcheancier = Object.assign({}, selectedRecord);
  }

  updateEcheancier(form: NgForm) {
    this.echeancierService.putEcheanciers().subscribe(
      res => {
        this.resetFormEcheancier(form);
        this.toastr.success("La modification a été effectuée", 'Security Park');
        this.echeancierService.refreshListEcheanciers();
      },
      err => { console.log(err); }
    )
  }

  onSubmitEcheancier(form: NgForm) {
    if (this.echeancierService.formDataEcheancier.IdEcheancier == 0) {
      this.insertEcheancier(form);
    } else {
      this.updateEcheancier(form);
    }
  }

}
