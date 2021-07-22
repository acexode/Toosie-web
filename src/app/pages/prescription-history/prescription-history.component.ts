import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PrescriptionService } from 'src/app/core/service/prescription/prescription.service';
export interface PrescriptionObject {
  prescriptionImage: string;
  description?: any;
  response?: any;
  isActive: boolean;
  _id: string;
  createdAt: Date;
  id: string;
}
@Component({
  selector: 'app-prescription-history',
  templateUrl: './prescription-history.component.html',
  styleUrls: ['./prescription-history.component.scss']
})
export class PrescriptionHistoryComponent implements OnInit {

  prescriptionList$!: Observable<[PrescriptionObject]>;
  constructor(private pres: PrescriptionService) { }

  ngOnInit() {
    this.prescriptionList$ = this.pres.allPrescriptions();
  }

}
