import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmbidComponent } from './confirmbid.component';

describe('ConfirmbidComponent', () => {
  let component: ConfirmbidComponent;
  let fixture: ComponentFixture<ConfirmbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
