import { Injectable } from '@angular/core';
import { ContratVGP } from './contrat-vgp.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratVGPService {

  formDataContratVGP: ContratVGP = {
    IdContratVgp: 0,
    DateDebutVgp: null,
    DureeVgp: 0,
    MontantVisite: 0,
    DateProchaineVgp: null
  }


  readonly rootURL = 'https://localhost:44338/api';
  contratsVGPListe: ContratVGP[];

  constructor(public http: HttpClient) { }

  getContratVGP(id) {
    return this.http.get(this.rootURL + "/ContratVgps/" + id);
  }

  postContratsVGP() {
    return this.http.post(this.rootURL + '/ContratVgps', this.formDataContratVGP);
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
