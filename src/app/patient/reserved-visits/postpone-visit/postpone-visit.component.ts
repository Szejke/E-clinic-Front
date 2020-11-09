import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PatientVisitsService} from '../../../services/patient-visits.service';
import {Visit} from '../../../shared/models/visit.model';

@Component({
  selector: 'app-postpone-visit',
  templateUrl: './postpone-visit.component.html',
  styleUrls: ['./postpone-visit.component.scss']
})
export class PostponeVisitComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Visit>();
  displayedColumns = ['doctor', 'date', 'visitTime', 'duration', 'cena', 'status', 'choose'];

  startDate = new Date();

  choosenDay: Date;

  constructor(public dialogRef: MatDialogRef<PostponeVisitComponent>, @Inject(MAT_DIALOG_DATA) public data: Visit, private patientVisitsService: PatientVisitsService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.refreshTable();

  }

  refreshTable() {
    this.patientVisitsService.getVisitsForPostpone(this.data.id).subscribe(value => this.updateDatasource(value));
  }

  refreshTableByDate() {
    console.log(this.choosenDay);
    this.patientVisitsService.getVisitsForPostponeByDate(this.data.id, this.choosenDay).subscribe(value => this.updateDatasource(value));
  }

  private updateDatasource(value) {
    this.dataSource.data = value;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  postponeVisit(id: string) {
    this.dialogRef.close(id);
  }

}
