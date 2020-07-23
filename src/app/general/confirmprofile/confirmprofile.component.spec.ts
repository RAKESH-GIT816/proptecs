import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmprofileComponent } from './confirmprofile.component';

describe('ConfirmprofileComponent', () => {
  let component: ConfirmprofileComponent;
  let fixture: ComponentFixture<ConfirmprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
