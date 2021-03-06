import { Injectable } from '@angular/core';
import { Contrats } from './contrats.model';
import { HttpClient } from '@angular/common/http';
import { Engins } from './engins.model';

@Injectable({
  providedIn: 'root'
})
export class ContratsService {

  formDataContrat: Contrats = {
    IdContrat: 0,
    DureeContrat: 0,
    DateFinContrat: null,
    DateEntree: null,
    PrixLoyer: 0,
    LieuUtilisation: '',
    DateSignatureIrrijardin: null,
    NumContrat: '',
    PrestataireLocation: '',
    TypeEngin: '',
    TypeContrat: '',
    DateSignaturePrestataire: null,
    DateCirculation: null,
    Commentaire: '',
    DateSortie: null,
    EtatContrat: ''
  }

  readonly rootURL = 'https://securityparkapi.azurewebsites.net/api';
  contratsListe: Contrats[];
  engins : Engins[];

  constructor(public http: HttpClient) { }

  getContrats() {
    return this.http.get(this.rootURL + "/Contrats");
  }

  getContrat(id) {
    return this.http.get(this.rootURL + "/Contrats/" + id);
  }

  postContrats() {
    var body = {
      ...this.formDataContrat,
      Engins : this.engins
    }
    return this.http.post(this.rootURL + '/Contrats', body);
  }

  putContrats() {
    return this.http.put(this.rootURL + '/Contrats/' + this.formDataContrat.IdContrat, this.formDataContrat);
  }

  deleteContrats(id) {
    return this.http.delete(this.rootURL + '/Contrats/' + id);
  }

  refreshContratListe() {
    this.http.get(this.rootURL + '/Contrats').toPromise().then(res => this.contratsListe = res as Contrats[]);
  }
}
