import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }
  
  ngOnInit() {
    this.form = this.fb.group({
      dob: ''
    });
  }
}
