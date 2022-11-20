import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingState } from 'src/store/loading/LoadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<LoadingState>;

  constructor(private _store: Store<{ loading: LoadingState }>) { }

  ngOnInit() {
    this.loadingState$ = this._store.select('loading');

  }

}
