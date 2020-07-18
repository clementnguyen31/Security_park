import { Component, OnInit, Inject } from '@angular/core';
import { InterventionsService } from 'src/app/shared/interventions.service';
import { ReparationService } from 'src/app/shared/reparation.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reparation } from 'src/app/shared/reparation.model';
import { Engins } from 'src/app/shared/engins.model';
import { EnginsService } from 'src/app/shared/engins.service';

@Component({
  selector: 'app-reparation-liste',
  templateUrl: './reparation-liste.component.html',
  styleUrls: ['./reparation-liste.component.css']
})
export class ReparationListeComponent implements OnInit {

  currentReparation : Reparation[];
  currentEnginInfo: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data,public reparationService: ReparationService, public enginService: EnginsService) { }

  ngOnInit(): void {
    console.log(this.data.idinterventionvgp);
    console.log(this.data.idengin);
    this.reparationService.getReparationByIdIntervention(this.data.idinterventionvgp).subscribe(res => {
      this.currentReparation = res;
    });
    this.enginService.getEngin(this.data.idengin).subscribe(res => {
      this.currentEnginInfo = res;
    })
  }

}
