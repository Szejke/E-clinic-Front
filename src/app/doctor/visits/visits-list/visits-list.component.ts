import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, ViewChild} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Visit} from '../../../shared/models/visit.model';
import {AddVisitComponent} from '../add-visit/add-visit.component';
import {VisitsService} from '../../../services/visits.service';
import {VisitDetailsComponent} from '../visit-details/visit-details.component';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements AfterViewInit {

  spinnerVisible = true;

  private _day: Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Visit>();
  displayedColumns = ['visitTime', 'duration', 'cena', 'status', 'remove'];
  isTableVisible = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private visitsService: VisitsService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  @Input('day')
  set day(day: Date) {
    this._day = day;
    this.refreshTable(day);
  }

  get day() {
    return this._day;
  }

  ngAfterViewInit() {
    this.refreshTable(this._day);
  }

  refreshTable(date: Date) {
    this.visitsService.getVisits(date).subscribe(value => {
      this.dataSource.data = value;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isTableVisible = true;
      this.spinnerVisible = false;
      this.changeDetectorRefs.detectChanges();
    });
  }

  openAddVisitDialog() {
    const dialogRef = this.dialog.open(AddVisitComponent, {
      width: '80vw',
      data:
        {
          year: this._day.getFullYear(),
          month: this._day.getMonth(),
          day: this._day.getDate(),
        }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerVisible = true;
        this.visitsService.tryAdd(result).subscribe(value => {
          this.refreshTable(this._day);
          this.changeDetectorRefs.detectChanges();
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(row: Visit) {
    this.dialog.open(VisitDetailsComponent, {
      width: '100vw',
      data: {
        visit: row,
        day: this._day
      }
    }).afterClosed().flatMap((visit: Visit) =>
      visit ? this.visitsService.updateVisit(visit.id, visit.receipt, visit.diagnose)
        : Observable.of(null))
      .subscribe((result: HttpResponse<any>) => {
        if (result != null) {
          if (result.status === 204) {
            this.snackBar.openFromComponent(DetailsSnackBarComponent, {
              duration: 5000,
              data: 'Przekazano do zapisu'
            });
          } else {
            this.snackBar.openFromComponent(DetailsSnackBarComponent, {
              duration: 5000,
              data: 'Coś poszło nie tak'
            });
          }
        }
      });
    this.refreshTable(this._day);
  }

  removeVisit(element) {
    this.visitsService.delete(element.id)
      .subscribe((result: HttpResponse<any>) => {
        if (result.status === 202) {
          this.snackBar.openFromComponent(DetailsSnackBarComponent, {
            duration: 5000,
            data: 'Przekazano do usunięcia'
          });
        } else {
          this.snackBar.openFromComponent(DetailsSnackBarComponent, {
            duration: 5000,
            data: 'Coś poszło nie tak'
          });
        }
      });
    this.refreshTable(this._day);
  }

  canRemove(visit: Visit) {
    const visitDate = new Date(visit.year, visit.month, visit.day, visit.hour, visit.minutes);
    return visitDate <= this.day;
  }


  canAdd() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today < this.day;
  }
}

@Component({
  selector: 'app-details-snackbar',
  template: '{{ data }}',
})
export class DetailsSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}
