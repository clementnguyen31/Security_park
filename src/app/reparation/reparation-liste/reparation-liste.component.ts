import { Component, OnInit, Inject } from '@angular/core';
import { InterventionsService } from 'src/app/shared/interventions.service';
import { ReparationService } from 'src/app/shared/reparation.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reparation } from 'src/app/shared/reparation.model';

@Component({
  selector: 'app-reparation-liste',
  templateUrl: './reparation-liste.component.html',
  styleUrls: ['./reparation-liste.component.css']
})
export class ReparationListeComponent implements OnInit {

  currentReparation : Reparation[];

  constructor(@Inject(MAT_DIALOG_DATA) public data,public reparationService: ReparationService) { }

  ngOnInit(): void {
    console.log(this.data.idinterventionvgp);
    this.reparationService.getReparationByIdIntervention(this.data.idinterventionvgp).subscribe(res => {
      this.currentReparation = res;
    });
  }

}
