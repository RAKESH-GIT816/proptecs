import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeequaityComponent } from './homeequaity.component';

describe('HomeequaityComponent', () => {
  let component: HomeequaityComponent;
  let fixture: ComponentFixture<HomeequaityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeequaityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeequaityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
