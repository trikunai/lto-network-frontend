import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  Validators,
  NG_VALIDATORS,
  Validator
} from '@angular/forms';
import { untilDestroyed } from '../../../core';
import { merge } from 'rxjs';

@Component({
  selector: 'wallet-password-form-field',
  templateUrl: './password-form-field.component.html',
  styleUrls: ['./password-form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordFormFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => PasswordFormFieldComponent)
    }
  ]
})
export class PasswordFormFieldComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() confirmation = false;
  @Input() appearance = 'standard';

  passwordControl = new FormControl('', [Validators.required]);
  confirmationControl = new FormControl('', [Validators.required]);

  passwordVisible = false;
  confirmationVisible = false;

  private _changeCb: Function | null = null;

  constructor() {}

  ngOnInit() {
    merge(this.passwordControl.valueChanges, this.confirmationControl.valueChanges)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this._changeCb) {
          this._changeCb(this.passwordControl.value);
        }
      });

    this.confirmationControl.setValidators(() => {
      return this.passwordControl.value !== this.confirmationControl.value
        ? {
            notMatch: true
          }
        : null;
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmationVisiblity() {
    this.confirmationVisible = !this.confirmationVisible;
  }

  getHint(isVisible: boolean): string {
    return isVisible ? 'Hide text' : 'Show text';
  }

  getInputType(isVisible: boolean): string {
    return isVisible ? 'text' : 'password';
  }

  getVisibilityIcon(isVisible: boolean) {
    return isVisible ? 'visibility_on' : 'visibility_off';
  }

  validate() {
    if (this.confirmation) {
      return this.passwordControl.valid && this.confirmationControl.valid
        ? null
        : { passwordInvalid: true };
    }

    return this.passwordControl.errors;
  }

  /**
   * ControlValueAccessor
   */

  registerOnChange(cb: Function) {
    this._changeCb = cb;
  }

  registerOnTouched(cb: Function) {}

  writeValue(value: any) {
    this.passwordControl.setValue(value);
  }
}
