import { Injectable } from '@angular/core';
import { ReparationNonvgp } from './reparation-nonvgp.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparationNonvgpService {

  formDataReparationNonVgp: ReparationNonvgp = {
    IdReparationNonVgp: 0,
    PrestataireVerification: '',
    DateDevis: null,
    DateDemandeResponse: null,
    MontantDevis: 0,
    DateValidationDevis: null,
    DateTravauxConformite: null,
    DateFacture: null,
    MontantFacture: 0,
    DateValidationFacture: null,
    TypeIntervention: '',
    IdEngin: 0
  }

  readonly rootURL = 'https://securityparkapi.azurewebsites.net/api';
  reparationListe: ReparationNonvgp[];

  constructor(public http: HttpClient) { }

  getReparationNonVgpByIdEngin(idengin): Observable<any> {
    let params = new HttpParams().set('IdEngin', idengin);
    return this.http.get(this.rootURL + "/ReparationNonVgps", { params: params });
  }

  getReparationsNonVgp() {
    return this.http.get(this.rootURL + "/ReparationNonVgps");
  }

  getReparationNonVgp(id) {
    return this.http.get(this.rootURL + "/ReparationNonVgps/" + id);
  }

  postReparationsNonVgp() {
    var body = {
      ...this.formDataReparationNonVgp
    }
    return this.http.post(this.rootURL + '/ReparationNonVgps', body);
  }

  putReparationsNonVgp() {
    return this.http.put(this.rootURL + '/ReparationNonVgps/' + this.formDataReparationNonVgp.IdReparationNonVgp, this.formDataReparationNonVgp);
  }

  deleteReparationsNonVgp(id) {
    return this.http.delete(this.rootURL + '/ReparationNonVgps/' + id);
  }

  refreshListReparationsNonVgp() {
    this.http.get(this.rootURL + '/ReparationNonVgps').toPromise().then(res => this.reparationListe = res as ReparationNonvgp[]);
  }
}
