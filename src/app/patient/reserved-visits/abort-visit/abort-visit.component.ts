import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-abort-visit',
  templateUrl: './abort-visit.component.html',
  styleUrls: ['./abort-visit.component.scss']
})
export class AbortVisitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AbortVisitComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  abortVisit(): void {
    this.dialogRef.close(true);
  }
}
