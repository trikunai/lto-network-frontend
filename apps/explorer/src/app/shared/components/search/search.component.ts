import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'explorer-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output()
  search = new EventEmitter<string>();

  @Output()
  blur = new EventEmitter();

  @Output()
  focus = new EventEmitter();

  @Input()
  placeholder = '';

  focused = false;
  inputValue = '';

  get isActive(): boolean {
    return this.focused || !!this.inputValue;
  }

  constructor() {}

  ngOnInit() {}

  onFocus() {
    this.focused = true;
    this.focus.next();
  }

  onBlur() {
    this.focused = false;
    this.blur.next();
  }

  searchSubmit(value: string, event: Event) {
    event.preventDefault();
    this.search.next(value.trim());
  }
}
