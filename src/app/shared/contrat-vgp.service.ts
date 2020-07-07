import { Injectable } from '@angular/core';
import { ContratVGP } from './contrat-vgp.model';
import { HttpClient } from '@angular/common/http';
import { Engins } from './engins.model';

@Injectable({
  providedIn: 'root'
})
export class ContratVGPService {

  formDataContratVGP: ContratVGP = {
    IdContratVgp: 0,
    DateDebutVgp: null,
    DureeVgp: 0,
    MontantVisite: 0,
    DateProchaineVgp: null,
    IdEngin: 0
  }


  readonly rootURL = 'https://localhost:44338/api';
  contratsVGPListe: ContratVGP[];
  engins: Engins[];

  constructor(public http: HttpClient) { }

  getContratVGP(id) {
    return this.http.get(this.rootURL + "/ContratVgps/" + id);
  }

  postContratsVGP() {
    var body = {
      ...this.formDataContratVGP,
      Engins: this.engins
    }
    return this.http.post(this.rootURL + '/ContratVgps', body);
  }

  putContratsVGP() {
    return this.http.put(this.rootURL + '/ContratVgps/' + this.formDataContratVGP.IdContratVgp, this.formDataContratVGP);
  }

  deleteContratsVGP(id) {
    return this.http.delete(this.rootURL + '/ContratVgps/' + id);
  }

  refreshListContratsVGP() {
    this.http.get(this.rootURL + '/ContratVgps').toPromise().then(res => this.contratsVGPListe = res as ContratVGP[]);
  }
}
