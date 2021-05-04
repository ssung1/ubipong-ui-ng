import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ubipong-ui-ng-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  event: any

  @Input()
  editEnabled: boolean = false

  @Output('submitEvent')
  submitFormEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  @Output('cancelEvent')
  cancelFormEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  inputEventName = new FormControl('', [Validators.required, Validators.maxLength(60)])
  inputStartTime = new FormControl()

  // cannot use `get timeOptionList()`.  not sure why yet, but material does not like it
  // when used as mat-option inside a mat-select
  readonly timeOptionList = Object.freeze([
    {hour: 8, minute: 0, display: "8:00am"},
    {hour: 9, minute: 0, display: "9:00am"},
    {hour: 10, minute: 0, display: "10:00am"},
    {hour: 11, minute: 0, display: "11:00am"},
    {hour: 12, minute: 0, display: "12:00pm"},
    {hour: 13, minute: 0, display: "1:00pm"},
    {hour: 14, minute: 0, display: "2:00pm"},
    {hour: 15, minute: 0, display: "3:00pm"},
    {hour: 16, minute: 0, display: "4:00pm"},
    {hour: 17, minute: 0, display: "5:00pm"},
  ])

  constructor() { }

  ngOnInit(): void {
  }

  enableEditing() {
    this.editEnabled = true
    this.inputEventName.setValue(this.event.name)
  }

  get inputEventNameErrorMessage() {
    if (this.inputEventName.hasError('required')) {
      return 'Name cannot be empty';
    }
    if (this.inputEventName.hasError('maxlength')) {
      return 'Name is too long';
    }
    return JSON.stringify(this.inputEventName.errors);
  }

  get inputStartTimeErrorMessage() {
    return JSON.stringify(this.inputStartTime.errors);
  }

  submitForm() {
    // offset in milliseconds for easy conversion
    const offset = new Date().getTimezoneOffset() * 60 * 1000
    // set clock to local time
    const startTime = new Date(new Date(this.event.startTime).getTime() + offset)
    // so that we can use setHours to get the right hours
    startTime.setHours(this.inputStartTime.value?.hour,
      this.inputStartTime.value?.minute, 0)

    this.submitFormEventEmitter.emit({
      ...this.event,
      name: this.inputEventName.value,
      startTime: startTime.toJSON()
    })
  }

  cancelForm() {
    this.cancelFormEventEmitter.emit(this.event)
  }
}
