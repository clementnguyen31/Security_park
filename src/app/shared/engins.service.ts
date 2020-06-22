import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Engins } from './engins.model';

@Injectable({
  providedIn: 'root'
})
export class EnginsService {

  formDataEngins : Engins = {
    IdEngin : 0,
    Matricule : null,
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
    DateCirculation : '',
    IdContrat : '0',
    IdEcheancier : 0,
    IdContratVgp : 0,
    InterventionEnCours : false
  };
  readonly rootURL = 'https://localhost:44338/api';
  enginsListe : Engins[];

  constructor(public http : HttpClient) { }

  getEngin(id){
    return this.http.get(this.rootURL + "/Engins/" + id);
  }

  postEngins() {
    return this.http.post(this.rootURL + '/Engins', this.formDataEngins);
  }

  putEngins() {
    return this.http.put(this.rootURL + '/Engins/'+ this.formDataEngins.IdEngin, this.formDataEngins);
  }

  deleteEngins(id) {
    return this.http.delete(this.rootURL + '/Engins/'+ id);
  }

  refreshListEngins(){
    this.http.get(this.rootURL + '/Engins').toPromise().then(res => this.enginsListe = res as Engins[]);
  }

}
