import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Visit} from '../../shared/models/visit.model';
import {PatientVisitsService} from '../../services/patient-visits.service';
import {Doctor} from '../../shared/models/doctor.model';
import {HttpResponse} from '@angular/common/http';
import {DetailsSnackBarComponent} from '../../doctor/visits/visits-list/visits-list.component';

@Component({
  selector: 'app-reserve-visit',
  templateUrl: './reserve-visit.component.html',
  styleUrls: ['./reserve-visit.component.scss']
})
export class ReserveVisitComponent implements AfterViewInit {

  spinnerVisible = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() reservedOk: EventEmitter<any> = new EventEmitter();

  dataSource = new MatTableDataSource<Visit>();
  displayedColumns = ['doctor', 'date', 'visitTime', 'duration', 'cena', 'status', 'reserve'];
  isTableVisible = false;

  doctors: Doctor[];

  startDate = new Date();

  choosenDay: Date;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private visitsService: PatientVisitsService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.visitsService.getFreeVisits().subscribe(value => {
      this.dataSource.data = value;
      this.doctors = value.map(v => v.doctor)
        .reduce((x, y) => x.findIndex(e => e.name === y.name) < 0 ? [...x, y] : x, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isTableVisible = true;
      this.spinnerVisible = false;
      this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  reserve(id: any) {
    this.visitsService.reserve(id)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status === 202) {
          this.snackBar.openFromComponent(DetailsSnackBarComponent, {
            duration: 5000,
            data: 'Przekazano do rejestracji'
          });
        } else {
          this.snackBar.openFromComponent(DetailsSnackBarComponent, {
            duration: 5000,
            data: result['message'] || 'Coś poszło nie tak. Spróbuj ponownie'
          });
        }
      });
    window.location.reload();
  }
}
