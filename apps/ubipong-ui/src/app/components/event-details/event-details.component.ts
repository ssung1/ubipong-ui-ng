import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { TournamentEvent } from '../../models/tournament-event'
import { TournamentTime } from '../../models/tournament-time'

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  event: TournamentEvent

  @Input()
  editEnabled: boolean = false

  @Output('submitEvent')
  submitFormEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  @Output('cancelEvent')
  cancelFormEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  inputEventName = new FormControl('', [Validators.required, Validators.maxLength(60)])
  inputStartDate = new FormControl('', [Validators.required])
  inputStartTime = new FormControl('', [Validators.required])

  readonly timeOptionList: readonly TournamentTime[] = Object.freeze([
    new TournamentTime({hour: 8, minute: 0}),
    new TournamentTime({hour: 9, minute: 0}),
    new TournamentTime({hour: 10, minute: 0}),
    new TournamentTime({hour: 11, minute: 0}),
    new TournamentTime({hour: 12, minute: 0}),
    new TournamentTime({hour: 13, minute: 0}),
    new TournamentTime({hour: 14, minute: 0}),
    new TournamentTime({hour: 15, minute: 0}),
    new TournamentTime({hour: 16, minute: 0}),
    new TournamentTime({hour: 17, minute: 0}),
  ])

  constructor() { }

  ngOnInit(): void {
  }

  enableEditing() {
    this.editEnabled = true
    this.inputEventName.setValue(this.event.name)
    this.inputStartDate.setValue(this.event.startTime)
    const startHour = new Date(this.event.startTime).getHours()
    const startHourOption = this.timeOptionList.find(option => 
      option.hour === startHour)
    this.inputStartTime.setValue(startHourOption)
  }

  disableEditing() {
    this.editEnabled = false
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
    this.disableEditing()
    this.cancelFormEventEmitter.emit(this.event)
  }
}
