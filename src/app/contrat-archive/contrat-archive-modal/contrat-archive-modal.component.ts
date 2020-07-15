import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratsService } from 'src/app/shared/contrats.service';
import { EnginsService } from 'src/app/shared/engins.service';

@Component({
  selector: 'app-contrat-archive-modal',
  templateUrl: './contrat-archive-modal.component.html',
  styleUrls: ['./contrat-archive-modal.component.css']
})
export class ContratArchiveModalComponent implements OnInit {

  currentContratInfo: any = {};
  currentEnginInfo: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public service: ContratsService,
    public enginservice: EnginsService,) { }

  ngOnInit(): void {
    this.service.getContrat(this.data.id).subscribe(res => {
      this.currentContratInfo = res;
    });
    this.enginservice.getEngin(this.data.idengin).subscribe(res => {
      this.currentEnginInfo = res;
    });
  }

}
