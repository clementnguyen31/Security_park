import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Engins } from './engins.model';
import { Echeanciers } from './echeanciers.model';

@Injectable({
  providedIn: 'root'
})
export class EnginsService {

  formDataEngins: Engins = {
    IdEngin: 0,
    Matricule: null,
    NumSerie: null,
    EstDeclareRentre: '',
    EstDeclareSortie: '',
    DateDeclarationEntree: '',
    DateDeclarationSortie: '',
    Marque: '',
    TypeContrat: '',
    TypeEngin: '',
    TypeBatterie: '',
    PeriodiciteVgp: null,
    EstVgp: false,
    DateCirculation: '',
    IdContrat: 0,
    IdContratVgp: 0,
    InterventionEnCours: false,
    EstArret: false,
  };
  readonly rootURL = 'https://localhost:44338/api';
  enginsListe: Engins[];
  echeancier: Echeanciers[];

  constructor(public http: HttpClient) { }

  getEngins(){
    return this.http.get(this.rootURL + "/Engins");
  }

  getEngin(id) {
    return this.http.get(this.rootURL + "/Engins/" + id);
  }

  postEngins() {
    var body = {
      ...this.formDataEngins,
      Echeanciers : this.echeancier
    }
    return this.http.post(this.rootURL + '/Engins', body);
  }

  putEngins() {
    return this.http.put(this.rootURL + '/Engins/' + this.formDataEngins.IdEngin, this.formDataEngins);
  }

  deleteEngins(id) {
    return this.http.delete(this.rootURL + '/Engins/' + id);
  }

  refreshListEngins() {
    this.http.get(this.rootURL + '/Engins').toPromise().then(res => this.enginsListe = res as Engins[]);
  }

}
