import { Injectable } from '@angular/core';
import { Contrats } from './contrats.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratsService {

  formDataContrat : Contrats = {
    IdContrat : '0',
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

  readonly rootURL = 'https://localhost:44338/api';
  contratsListe : Contrats[];

  constructor(public http: HttpClient) { }

  getContrats(){
    return this.http.get(this.rootURL + "/Contrats").toPromise();
  }

  getContrat(id){
    return this.http.get(this.rootURL + "/Contrats/" + id);
  }

  postContrats() {
    var body = {
      ...this.formDataContrat,
      Contrats: this.contratsListe
    };
    return this.http.post(this.rootURL + '/Contrats', body);
  }

  putContrats() {
    return this.http.put(this.rootURL + '/Contrats/'+ this.formDataContrat.IdContrat, this.formDataContrat);
  }

  deleteContrats(id) {
    return this.http.delete(this.rootURL + '/Contrats/'+ id);
  }

  refreshListContrats(){
    this.http.get(this.rootURL + '/Contrats').toPromise().then(res => this.contratsListe = res as Contrats[]);
  }
}
