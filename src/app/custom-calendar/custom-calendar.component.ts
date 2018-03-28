import { Component, OnInit, ExistingProvider, forwardRef, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ControlValueAccessor } from '@angular/forms';
import { Calendar } from 'primeng/calendar';

const CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomCalendarComponent),
  multi: true
};

const CALENDAR_VALIDATOR: ExistingProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CustomCalendarComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'prime-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css'],
  providers: [CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR],
})
export class CustomCalendarComponent implements ControlValueAccessor, OnInit {

  date1: FormControl;

  @ViewChild(Calendar) private _calendar: Calendar;
  @Input() validInputMapping: Map<string, Date> = new Map<string, Date>();

  private onChange = (_) => { };
  private onTouched = () => { };

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.date1 = new FormControl();
    this.setvalidInputSet();

    if (this._calendar) {
      const origOnInput = this._calendar.onUserInput;
      this._calendar.onUserInput = (event) => {
        this.onInput(event);
        origOnInput.call(this._calendar, event);
      };
    }

  }

  writeValue(value: any) {
    if (value) {
      this.date1.setValue(value);
    }
  }


  setvalidInputSet() {
    const today: Date = new Date();
    this.validInputMapping.set('T', new Date());
    const tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.validInputMapping.set('Y', tomorrow);
  }

  private onInput(event) {
    if (this.validInputMapping.has(event.target.value)) {
      const mapValue = this.validInputMapping.get(event.target.value);
      this.date1.setValue(mapValue);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
