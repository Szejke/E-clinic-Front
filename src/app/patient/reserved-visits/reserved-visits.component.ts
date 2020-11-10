import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {PatientVisitsService} from '../../services/patient-visits.service';
import {Visit} from '../../shared/models/visit.model';
import {HttpResponse} from '@angular/common/http';
import {DetailsSnackBarComponent} from '../../doctor/visits/visits-list/visits-list.component';
import {AbortVisitComponent} from './abort-visit/abort-visit.component';
import {PostponeVisitComponent} from './postpone-visit/postpone-visit.component';

@Component({
  selector: 'app-reserved-visits',
  templateUrl: './reserved-visits.component.html',
  styleUrls: ['./reserved-visits.component.scss']
})
export class ReservedVisitsComponent implements AfterViewInit {
  paymentUrl = 'https://www.przelewy24.pl/demo/demo.php';
  spinnerVisible = true;
  applyFilter: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Visit>();
  displayedColumns = ['doctor', 'date', 'visitTime', 'duration', 'cena', 'status', 'pay', 'abort', 'postpone'];
  isTableVisible = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private visitsService: PatientVisitsService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.visitsService.getReservedVisits().subscribe(value => {
      this.dataSource.data = value;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isTableVisible = true;
      this.spinnerVisible = false;
      this.changeDetectorRefs.detectChanges();
    });
  }

  abortVisit(id: string) {
    this.dialog.open(AbortVisitComponent, {
      width: '80vw'
    }).afterClosed()
      .subscribe(aborting => {
        if (aborting) {
          this.visitsService.abort(id)
            .subscribe((result: HttpResponse<any>) => {
              console.log(result);
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
        }
        window.location.reload();
      });
  }

  postponeVisit(visit: Visit) {
    this.dialog.open(PostponeVisitComponent, {
      width: '100vw',
      data: visit
    }).afterClosed().subscribe(newVisit => {
      if (newVisit) {
        this.visitsService.postpone(visit.id, newVisit)
          .subscribe((result: HttpResponse<any>) => {
            if (result.status === 202) {
              this.snackBar.openFromComponent(DetailsSnackBarComponent, {
                duration: 5000,
                data: 'Przekazano do przełożenia'
              });
              window.location.reload();
            } else {
              this.snackBar.openFromComponent(DetailsSnackBarComponent, {
                duration: 5000,
                data: 'Coś poszło nie tak'
              });
            }
          });
        this.refreshTable();
      }
    });
  }

  pay(visit: Visit) {
    const paymentWindow = window.open(this.paymentUrl, 'Płatność za wizytę', 'width=960,height=600,left=1,top=1');
    console.log(paymentWindow);
    const timer = setInterval(() => {
      if (paymentWindow.closed) {
        clearInterval(timer);
        this.visitsService.pay(visit.id).subscribe(result => {
          if (result.status === 202) {
            this.snackBar.openFromComponent(DetailsSnackBarComponent, {
              duration: 5000,
              data: 'Zapłacono'
            });
            window.location.reload();
          } else {
            this.snackBar.openFromComponent(DetailsSnackBarComponent, {
              duration: 5000,
              data: 'Płatnośćnie zostałą zatwierdzona. Spróbuj ponownie'
            });
          }
        })
      }
    }, 1000);
  }

  isInFuture(visit: Visit) {
    const now = new Date();
    const visitDate = new Date(visit.year, visit.month, visit.day, visit.hour, visit.minutes)
    return now > visitDate;
  }

}
