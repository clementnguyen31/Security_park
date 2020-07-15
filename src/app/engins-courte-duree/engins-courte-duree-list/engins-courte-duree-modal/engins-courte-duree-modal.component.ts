import { Component, OnInit, Inject } from '@angular/core';
import { Echeanciers } from 'src/app/shared/echeanciers.model';
import { Interventions } from 'src/app/shared/interventions.model';
import { EnginsService } from 'src/app/shared/engins.service';
import { ContratsService } from 'src/app/shared/contrats.service';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';
import { EcheanciersService } from 'src/app/shared/echeanciers.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InterventionsService } from 'src/app/shared/interventions.service';
import { InterventionsFormComponent } from 'src/app/interventions/interventions-form/interventions-form.component';
import { ReparationFormComponent } from 'src/app/reparation/reparation-form/reparation-form.component';
import { ReparationListeComponent } from 'src/app/reparation/reparation-liste/reparation-liste.component';
import { ReparationNonvgp } from 'src/app/shared/reparation-nonvgp.model';
import { ReparationNonvgpService } from 'src/app/shared/reparation-nonvgp.service';
import { ReparationNonVgpFormComponent } from 'src/app/reparation-non-vgp/reparation-non-vgp-form/reparation-non-vgp-form.component';

@Component({
  selector: 'app-engins-courte-duree-modal',
  templateUrl: './engins-courte-duree-modal.component.html',
  styleUrls: ['./engins-courte-duree-modal.component.css']
})
export class EnginsCourteDureeModalComponent implements OnInit {
  
  currentEnginInfo: any = {};
  currentEnginContrat: any = {};
  currentEnginEcheancier: any = {};
  echeanciersByIdEngin: Echeanciers[];
  interventionByIdEngin: Interventions[];
  reparationNonVgpByIdEngin: ReparationNonvgp[];


  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public enginservice: EnginsService,
    public contratservice: ContratsService,
    public contratVGPService: ContratVGPService,
    public echeancierService: EcheanciersService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public interventionService: InterventionsService,
    public reparationnonvgpService: ReparationNonvgpService) { }

  ngOnInit(): void {
    this.enginservice.getEngin(this.data.id).subscribe(res => {
      this.currentEnginInfo = res;
    });
    this.contratservice.getContrat(this.data.idcontrat).subscribe(res => {
      this.currentEnginContrat = res;
    });
    this.interventionService.getInterventionVgpsByIdEngin(this.data.id).subscribe(res => {
      this.interventionByIdEngin = res;
    });
    this.reparationnonvgpService.getReparationNonVgpByIdEngin(this.data.id).subscribe(res => {
      this.reparationNonVgpByIdEngin = res;
    })

  }

  addIntervention(idengin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { idengin };
    const dialogRef = this.dialog.open(InterventionsFormComponent, dialogConfig);
  }

  modifierIntervention(selectedRecord){
    this.interventionService.formDataInterventionVgps = Object.assign({}, selectedRecord);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(InterventionsFormComponent, dialogConfig);
  }

  ajouterReparation(idIntervention){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { idIntervention };
    const dialogRef = this.dialog.open(ReparationFormComponent, dialogConfig);
  }

  voirReparation(idinterventionvgp){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { idinterventionvgp };
    const dialogRef = this.dialog.open(ReparationListeComponent, dialogConfig);
  }

  ajouterReparationNonVGP(idengin){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = { idengin };
    const dialogRef = this.dialog.open(ReparationNonVgpFormComponent, dialogConfig);
  }

}
