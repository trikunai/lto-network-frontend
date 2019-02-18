import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LtoPublicNodeService, BlockHeader } from '@lto/core';
import { Observable, timer } from 'rxjs';
import { switchMap, switchMapTo, map } from 'rxjs/operators';

@Component({
  selector: 'explorer-last-blocks',
  templateUrl: './last-blocks.component.html',
  styleUrls: ['./last-blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastBlocksComponent implements OnInit {
  lastBlocksHeaders$: Observable<BlockHeader[]>;

  constructor(private _publicNode: LtoPublicNodeService) {
    this.lastBlocksHeaders$ = timer(0, 5000).pipe(
      switchMapTo(_publicNode.blocksHeight()),
      switchMap(height => _publicNode.blockHeaders(height, 20)),
      map(headers => headers.reverse())
    );
  }

  ngOnInit() {}
}
