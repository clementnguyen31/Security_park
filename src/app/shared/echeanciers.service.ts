import { Injectable } from '@angular/core';
import { Echeanciers } from './echeanciers.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  getEcheanciersByIdEngin(id){
    return this.http.get(this.rootURL + "/Echeanciers?IdEngin=" + id);
  }

  getEcheanciers(){
    return this.http.get(this.rootURL + "/Echeanciers");
  }

  getEcheancier(id){
    return this.http.get(this.rootURL + "/Echeanciers/" + id);
  }

  postEcheanciers() {
    var headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post<any>(this.rootURL + '/Echeanciers', this.formDataEcheancier, {headers});
  }

  errorHandler(error: HttpErrorResponse){
    console.log(error);
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
  

}
