import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { LocalUserAccount } from '../../../core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'wallet-available-accounts',
  templateUrl: './available-accounts.component.html',
  styleUrls: ['./available-accounts.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AvailableAccountsComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailableAccountsComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() accounts!: LocalUserAccount[];
  @Output() deleteAccount = new EventEmitter<LocalUserAccount>();

  get value() {
    return this.selectedAccount.value;
  }

  set value(value: LocalUserAccount) {
    this.selectedAccount.setValue(value);
    if (this._changeCb) {
      this._changeCb(value);
    }
  }

  selectedAccount = new FormControl();
  private _changeCb: Function | null = null;

  constructor() {}

  ngOnInit() {
    this.value = this.accounts[0];
  }

  ngOnChanges() {
    this.value = this.accounts[0];
  }

  delete(account: LocalUserAccount, event: Event) {
    event.stopPropagation();
    this.deleteAccount.next(account);
  }

  /**
   * ControlValueAccessor
   */

  registerOnChange(cb: Function) {
    this._changeCb = cb;
    cb(this.value);
  }

  registerOnTouched(cb: Function) {}

  writeValue(value: any) {}
}
