import { Injectable } from '@angular/core';
import { Interventions } from './interventions.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Engins } from './engins.model';
import { Observable } from 'rxjs';
import { EnginsService } from './engins.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {

  formDataInterventionVgps: Interventions = {
    IdInterventionVgp: 0,
    DateIntervention: null,
    EstRapportRecu: false,
    PrestataireVerification: '',
    EstSatisfaisant: false,
    Commentaire: '',
    EstSuite: false,
    IdFacture: 0,
    IdEngin: 0
  }

  engins : Engins[];

  readonly rootURL = 'https://localhost:44338/api';
  InterventionVGPListe: Interventions[];

  constructor(public http: HttpClient, public enginservice: EnginsService) { }

  
  getInterventionVgpsByIdEngin(idEngin): Observable<any> {
    let params = new HttpParams().set('IdEngin', idEngin);
    return this.http.get(this.rootURL + "/InterventionVgps", { params: params });
  }

  getInterventionVgp(id) {
    return this.http.get(this.rootURL + "/InterventionVgps/" + id);
  }

  postInterventionVgps() {
    var body = {
      ...this.formDataInterventionVgps,
      Engins : this.engins
    }
    return this.http.post(this.rootURL + '/InterventionVgps', body);
  }

  putInterventionVgps() {
    return this.http.put(this.rootURL + '/InterventionVgps/' + this.formDataInterventionVgps.IdInterventionVgp, this.formDataInterventionVgps);
  }

  deleteInterventionVgps(id) {
    return this.http.delete(this.rootURL + '/InterventionVgps/' + id);
  }

  refreshListInterventionVgps() {
    this.http.get(this.rootURL + '/InterventionVgps').toPromise().then(res => this.InterventionVGPListe = res as Interventions[]);
  }
}
