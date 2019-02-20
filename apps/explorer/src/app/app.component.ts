import { Component } from '@angular/core';
import { SearchService } from './core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'explorer';

  constructor(
    private _searchService: SearchService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  search(query: string) {
    this._searchService.search(query).subscribe(type => {
      switch (type) {
        case 'address':
          return this._router.navigate(['/', 'addresses', query]);
        case 'block':
          return this._router.navigate(['/', 'blocks', query]);
        case 'transaction':
          return this._router.navigate(['/', 'transaction', query]);
      }

      this._snackbar.open('Not found', 'Dismiss', { duration: 3000 });
    });
  }
}
