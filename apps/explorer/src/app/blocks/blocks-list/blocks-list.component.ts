import { Component, OnInit } from '@angular/core';
import { LtoPublicNodeService, BlockHeader } from '@lto/core';
import { switchMap, exhaustMap, shareReplay, take, startWith, scan, map } from 'rxjs/operators';
import { Subject, merge, Observable } from 'rxjs';

@Component({
  selector: 'explorer-blocks-list',
  templateUrl: './blocks-list.component.html',
  styles: []
})
export class BlocksListComponent implements OnInit {
  loadMore$ = new Subject<any>();
  height$ = new Subject<number>();
  blocks$: Observable<BlockHeader[]>;

  constructor(private _publicNode: LtoPublicNodeService) {
    const height$ = merge(_publicNode.blocksHeight(), this.height$).pipe(shareReplay(1));

    this.blocks$ = this.loadMore$.pipe(
      startWith(0),
      exhaustMap(() => {
        return height$.pipe(
          take(1),
          switchMap(height => {
            this.height$.next(height - 99);
            return _publicNode.blockHeaders(height, 99);
          }),
          map(blocks => blocks.reverse())
        );
      }),
      scan((blocks, newBlocks) => {
        return [...blocks, ...newBlocks];
      })
    );
  }

  ngOnInit() {}

  more() {
    this.loadMore$.next();
  }
}
