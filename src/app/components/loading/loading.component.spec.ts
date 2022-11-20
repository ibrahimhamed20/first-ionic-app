import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { HIDE_LOADER, SHOW_LOADER } from 'src/store/loading/loading.actions';
import { loadingReducer } from 'src/store/loading/loading.reducers';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should hide loading component when it is not loading', () => {
    const compiled = fixture.nativeElement;

    store.dispatch(HIDE_LOADER());
    fixture.detectChanges();

    expect(compiled.querySelector('.backdrop')).toBeNull();
  });

  it('should show loading component when it is loading', () => {
    const compiled = fixture.nativeElement;

    store.dispatch(SHOW_LOADER());
    fixture.detectChanges();

    expect(compiled.querySelector('.backdrop')).not.toBeNull();
  });
});
