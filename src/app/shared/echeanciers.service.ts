import { Injectable } from '@angular/core';
import { Echeanciers } from './echeanciers.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcheanciersService {

  formDataEcheancier : Echeanciers = {
    IdEcheancier : 0,
    MoisEcheancier : '',
    Montant : '',
    IdEngin : 0
  }

  readonly rootURL = 'https://localhost:44338/api';
  echeanciersList : Echeanciers[];

  constructor(public http: HttpClient) { }

  getEcheancier(id){
    return this.http.get(this.rootURL + "/Echeanciers/" + id);
  }

  postEcheanciers() {
    return this.http.post(this.rootURL + '/Echeanciers', this.formDataEcheancier);
  }

  putEcheanciers() {
    return this.http.put(this.rootURL + '/Echeanciers/'+ this.formDataEcheancier.IdEcheancier, this.formDataEcheancier);
  }

  deleteEcheanciers(id) {
    return this.http.delete(this.rootURL + '/Echeanciers/'+ id);
  }

  refreshListEcheanciers(){
    this.http.get(this.rootURL + '/Echeanciers').toPromise().then(res => this.echeanciersList = res as Echeanciers[]);
  }

  addEcheanciers(ech: Echeanciers){
    return this.http.post(this.rootURL+'/Echeanciers',ech);
  }

}
