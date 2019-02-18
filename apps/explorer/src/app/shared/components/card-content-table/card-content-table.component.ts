import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'explorer-card-content-table',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./card-content-table.component.scss']
})
export class CardContentTableComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
