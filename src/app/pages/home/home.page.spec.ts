import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to all pickup calls after click see all', () => {
    spyOn(router, 'navigate');

    component.viewAll();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  });

  it('should navigate to add new pickup call after click add new', () => {
    spyOn(router, 'navigate');

    component.addNew();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  });
});
