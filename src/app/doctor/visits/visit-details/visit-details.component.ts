import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Visit} from '../../../shared/models/visit.model';
import {MyErrorStateMatcher} from '../../../shared/validators/error-matcher.validator';
import {receiptGenerator} from '../../../shared/generators/pdf.generator';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit {

  short:any;
  time: any;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<VisitDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                visit: Visit, day: Date
              },
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      receipt: [this.data.visit.receipt],
      diagnose: [this.data.visit.diagnose]
    })
  }

  save() {
    if (this.form.controls.receipt.value !== '' && this.form.controls.diagnose.value) {
      this.generatePdf();
      this.dialogRef.close({
        ...this.data.visit,
        receipt: this.form.controls.receipt.value,
        diagnose: this.form.controls.diagnose.value
      });
    } else {
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generatePdf() {
    receiptGenerator(this.form.controls.receipt.value);
  }

}
