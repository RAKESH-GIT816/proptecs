import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSidemenuComponent } from './sell-sidemenu.component';

describe('SellSidemenuComponent', () => {
  let component: SellSidemenuComponent;
  let fixture: ComponentFixture<SellSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
