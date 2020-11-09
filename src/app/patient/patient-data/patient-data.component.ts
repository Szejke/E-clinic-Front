import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../shared/models/patient.model';
import {MyErrorStateMatcher} from '../../shared/validators/error-matcher.validator';
import {MatSnackBar} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {DetailsSnackBarComponent} from '../../doctor/visits/visits-list/visits-list.component';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit{

  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(public snackBar: MatSnackBar,
              private patientService: PatientService,
              private fb: FormBuilder,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      pesel: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      postalCode: ['', Validators.compose([Validators.required])]
    });
    this.getData();
  }

  getData() {
    this.patientService.getPatientData().subscribe((patient: Patient) => {
      this.form.controls.name.setValue(patient.name);
      this.form.controls.surname.setValue(patient.surname);
      this.form.controls.pesel.setValue(patient.pesel);
      this.form.controls.address.setValue(patient.address);
      this.form.controls.postalCode.setValue(patient.postalCode);
      this.changeDetectorRefs.detectChanges();
    });
  }

  savePatientData() {
    this.patientService.savePatientData(this.form.value)
      .subscribe((result: HttpResponse<any>) => {
        if (result.status === 200) {
          this.snackBar.openFromComponent(DetailsSnackBarComponent, {
            duration: 5000,
            data: 'Zapisano'
          });
          this.getData();
        } else {
          this.snackBar.openFromComponent(DetailsSnackBarComponent, {
            duration: 5000,
            data: 'Coś poszło nie tak'
          });
        }
      });
  }
}
