import { Injectable } from '@angular/core';
import { Reparation } from './reparation.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  formDataReparation: Reparation = {
    IdReparation: 0,
    PrestataireVerfifcation: '',
    DateDevis: null,
    DateDemandeReponse: null,
    MontantDevis: 0,
    DateValidationDevis: null,
    DateTravauxConformite: null,
    DateFacture: null,
    MontantFacture: 0,
    DateValidationFacture: null,
    TypeIntervention: '',
    IdInterventionVgp: 0
  }

  readonly rootURL = 'https://localhost:44338/api';
  reparationListe: Reparation[];

  constructor(public http: HttpClient) { }

  getReparationByIdIntervention(idintervention): Observable<any> {
    let params = new HttpParams().set('IdInterventionVgp', idintervention);
    return this.http.get(this.rootURL + "/Reparations", { params: params });
  }

  getReparations() {
    return this.http.get(this.rootURL + "/Reparations");
  }

  getReparation(id) {
    return this.http.get(this.rootURL + "/Reparations/" + id);
  }

  postReparations() {
    var body = {
      ...this.formDataReparation
    }
    return this.http.post(this.rootURL + '/Reparations', body);
  }

  putReparations() {
    return this.http.put(this.rootURL + '/Reparations/' + this.formDataReparation.IdReparation, this.formDataReparation);
  }

  deleteReparations(id) {
    return this.http.delete(this.rootURL + '/Reparations/' + id);
  }

  refreshListReparations() {
    this.http.get(this.rootURL + '/Reparations').toPromise().then(res => this.reparationListe = res as Reparation[]);
  }
}
