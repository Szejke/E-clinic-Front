import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../shared/validators/error-matcher.validator';
import {NewVisit} from '../../../shared/models/new-visit.model';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.scss']
})
export class AddVisitComponent implements OnInit {

  form: FormGroup;
  matcher: MyErrorStateMatcher;

  startTimes = [
    '0:00',
    '0:15',
    '0:30',
    '0:45',
    '1:00',
    '1:15',
    '1:30',
    '1:45',
    '2:00',
    '2:15',
    '2:30',
    '2:45',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '8:15',
    '8:30',
    '8:45',
    '9:00',
    '9:15',
    '9:30',
    '9:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
    '20:00',
    '20:15',
    '20:30',
    '20:45',
    '21:00',
    '21:15',
    '21:30',
    '21:45',
    '22:00',
    '22:15',
    '22:30',
    '22:45',
    '23:00',
    '23:15',
    '23:30',
    '23:45',
  ];

  visitDurations = [
    15,
    30,
    45,
    60
  ];

  constructor(public dialogRef: MatDialogRef<AddVisitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NewVisit,
              private fb: FormBuilder) {
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit() {
    this.form = this.fb.group({
      startTime: [this.prepareStartTime(), Validators.compose([Validators.required])],
      visitDurationMinutes: [15, Validators.compose([Validators.required])],
      numberOfVisits: ['10', Validators.compose([Validators.required])],
      price: [50, Validators.compose([Validators.required, Validators.min(0), Validators.max(1000000)])]
    });

    this.form.valueChanges.subscribe(value => {
      switch (this.form.get('visitDurationMinutes').value) {
        case 15:
          this.form.get('numberOfVisits').clearValidators();
          this.form.get('numberOfVisits').setValidators(Validators.compose([Validators.required, Validators.max(24 * 4)]));
          break;
        case 30:
          this.form.get('numberOfVisits').clearValidators();
          this.form.get('numberOfVisits').setValidators(Validators.compose([Validators.required, Validators.max(24 * 2)]));
          break;
        case 45:
          this.form.get('numberOfVisits').clearValidators();
          this.form.get('numberOfVisits').setValidators(Validators.compose([Validators.required, Validators.max(32)]));
          break;
        default:
          this.form.get('numberOfVisits').clearValidators();
          this.form.get('numberOfVisits').setValidators(Validators.compose([Validators.required, Validators.max(24)]));
      }
    });
  }

  private prepareStartTime(): string {
    const now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    if (minutes >= 45) {
      hour += 2;
      minutes = 0;
    } else if (minutes >= 30) {
      minutes = 45;
    } else if (minutes >= 15) {
      minutes = 30
    } else {
      minutes = 15;
    }

    return hour + ':' + minutes;
  }

  saveVisits() {
    this.data = {
      ...this.data,
      duration: this.form.get('visitDurationMinutes').value,
      numberOfVisits: parseInt(this.form.get('numberOfVisits').value, 10),
      price: this.form.get('price').value
    };
    this.data.startHour = parseInt(this.form.controls.startTime.value.split(':')[0], 10);
    this.data.startMinutes = parseInt(this.form.controls.startTime.value.split(':')[1], 10);
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  canChoose(time: string) {
    const now = new Date();
    const timeArray = time.split(':');
    const date = new Date(this.data.year, this.data.month, this.data.day);
    return (now > date) && (parseInt(timeArray[0], 10) < now.getHours() || (parseInt(timeArray[0], 10) === now.getHours() && parseInt(timeArray[0], 10) < now.getMinutes()));
  }
}
