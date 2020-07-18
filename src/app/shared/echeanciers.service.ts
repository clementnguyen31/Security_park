import { Injectable } from '@angular/core';
import { Echeanciers } from './echeanciers.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnginsService } from './engins.service';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';          
const EXCEL_EXTENSION = '.xlsx';  

@Injectable({
  providedIn: 'root'
})
export class EcheanciersService {

  formDataEcheancier: Echeanciers = {
    IdEcheancier: 0,
    DateEcheancier: null,
    Montant: 0,
    IdEngin: 0,
    Matricule: 0,
    LieuUtilisation: '',
    DateDebutContrat: null,
    DureeContrat: 0
  }

  readonly rootURL = 'https://securityparkapi.azurewebsites.net/api';
  echeanciersList: Echeanciers[];

  constructor(public http: HttpClient) { }

  getEcheanciersByIdEngin(idEngin): Observable<any> {
    let params = new HttpParams().set('IdEngin', idEngin);
    return this.http.get(this.rootURL + "/Echeanciers", { params: params });
  }

  getEcheanciers() {
    return this.http.get(this.rootURL + "/Echeanciers");
  }

  getEcheancier(id) {
    return this.http.get(this.rootURL + "/Echeanciers/" + id);
  }

  postEcheanciers() {
    var headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>(this.rootURL + '/Echeanciers', this.formDataEcheancier, { headers });
  }

  putEcheanciers() {
    return this.http.put(this.rootURL + '/Echeanciers/' + this.formDataEcheancier.IdEcheancier, this.formDataEcheancier);
  }

  deleteEcheanciers(id) {
    return this.http.delete(this.rootURL + '/Echeanciers/' + id);
  }

  refreshListEcheanciers() {
    this.http.get(this.rootURL + '/Echeanciers').toPromise().then(res => this.echeanciersList = res as Echeanciers[]);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { header: ['Matricule', 'DateEcheancier', 'Montant', 'LieuUtilisation', 'DateDebutContrat', 'DureeContrat']
    });  
    console.log('worksheet', worksheet);  
    const workbook: XLSX.WorkBook = {  
        Sheets: {  
            'data': worksheet  
        },  
        SheetNames: ['data']  
    };  
    const excelBuffer: any = XLSX.write(workbook, {  
        bookType: 'xlsx',  
        type: 'array'  
    });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
}  
private saveAsExcelFile(buffer: any, fileName: string): void {  
    const data: Blob = new Blob([buffer], {  
        type: EXCEL_TYPE  
    });  
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + EXCEL_EXTENSION);  
} 


}
