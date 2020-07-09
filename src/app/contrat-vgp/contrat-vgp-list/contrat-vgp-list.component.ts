import { Component, OnInit } from '@angular/core';
import { ContratVGPService } from 'src/app/shared/contrat-vgp.service';

@Component({
  selector: 'app-contrat-vgp-list',
  templateUrl: './contrat-vgp-list.component.html',
  styleUrls: ['./contrat-vgp-list.component.css']
})
export class ContratVgpListComponent implements OnInit {

  constructor(  public contratvgpservice: ContratVGPService) { }

  ngOnInit(): void {
    this.contratvgpservice.refreshListContratsVGP();
  }

}
