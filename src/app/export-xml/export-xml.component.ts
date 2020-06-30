import { Component, OnInit } from '@angular/core';
import { EcheanciersService } from '../shared/echeanciers.service';

@Component({
  selector: 'app-export-xml',
  templateUrl: './export-xml.component.html',
  styleUrls: ['./export-xml.component.css']
})
export class ExportXmlComponent implements OnInit {

  constructor(private echeancierservice: EcheanciersService) { }

  ngOnInit(): void {
    this.echeancierservice.refreshListEcheanciers();
  }

  Exportelx() {  
    this.echeancierservice.exportAsExcelFile(this.echeancierservice.echeanciersList, "EcheancierFacturation");
}  


}
