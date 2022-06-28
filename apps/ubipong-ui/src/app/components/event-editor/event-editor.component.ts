import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { TournamentEvent } from '../../models/tournament-event'
import { TournamentTime } from '../../models/tournament-time'

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  @Input()
  event: TournamentEvent | null = null

  @Output('submitEvent')
  submitFormEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  @Output('cancelEvent')
  cancelFormEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  inputEventName = new FormControl('', [Validators.required, Validators.maxLength(60)])
  inputChallongeUrl = new FormControl('', [Validators.required, Validators.maxLength(30)])
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
    this.inputEventName.setValue(this.event?.name)
    this.inputStartDate.setValue(this.event?.startTime)
    const startHour = this.event?.startTime ?
      new Date(this.event.startTime).getHours() : 8
    const startHourOption = this.timeOptionList.find(option => 
      option.hour === startHour)
    this.inputStartTime.setValue(startHourOption)
    this.inputChallongeUrl.setValue(this.event?.challongeUrl)
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

  get inputChallongeUrlErrorMessage() {
    if (this.inputChallongeUrl.hasError('required')) {
      return 'Challonge URL cannot be empty';
    }
    if (this.inputChallongeUrl.hasError('maxlength')) {
      return 'Challonge URL is too long';
    }
    return JSON.stringify(this.inputChallongeUrl.errors);
  }

  get inputStartDateErrorMessage() {
    if (this.inputStartDate.hasError('required')) {
      return 'Start date cannot be empty';
    }
    return JSON.stringify(this.inputStartDate.errors);
  }

  get inputStartTimeErrorMessage() {
    if (this.inputStartTime.hasError('required')) {
      return 'Start time cannot be empty';
    }
    return JSON.stringify(this.inputStartTime.errors);
  }

  submitForm() {
    // offset in milliseconds for easy conversion
    const offset = new Date().getTimezoneOffset() * 60 * 1000
    // set clock to local time
    const startTime = new Date(new Date(this.inputStartDate.value).getTime() + offset)
    // so that we can use setHours to get the right hours
    startTime.setHours(this.inputStartTime.value?.hour,
      this.inputStartTime.value?.minute, 0)

    this.submitFormEventEmitter.emit({
      ...this.event,
      name: this.inputEventName.value,
      startTime: startTime.toJSON(),
      challongeUrl: this.inputChallongeUrl.value ?? this.event?.challongeUrl
    })
  }

  cancelForm() {
    this.cancelFormEventEmitter.emit(this.event)
  }

  get isFormInvalid() {
    return this.inputEventName.invalid ||
      this.inputStartDate.invalid ||
      this.inputStartTime.invalid
  }
}
