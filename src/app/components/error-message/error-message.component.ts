import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() message: string;
  @Input() field: FormGroup | AbstractControl;
  @Input() error: string;

  constructor() { }

  ngOnInit() { }

  showMessage() {
    if (this.field?.touched && this.field.errors?.[this.error]) return true;
    else return false;
  }

}
