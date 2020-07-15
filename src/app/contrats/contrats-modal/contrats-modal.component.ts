import { Component, OnInit, Inject } from '@angular/core';
import { ContratsService } from 'src/app/shared/contrats.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contrats-modal',
  templateUrl: './contrats-modal.component.html',
  styleUrls: ['./contrats-modal.component.css']
})
export class ContratsModalComponent implements OnInit {

  currentContratInfo: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public service: ContratsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getContrat(this.data.idengin).subscribe(res => {
      this.currentContratInfo = res;
    })
  }

}
