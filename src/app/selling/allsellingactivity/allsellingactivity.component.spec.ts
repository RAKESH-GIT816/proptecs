import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsellingactivityComponent } from './allsellingactivity.component';

describe('AllsellingactivityComponent', () => {
  let component: AllsellingactivityComponent;
  let fixture: ComponentFixture<AllsellingactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllsellingactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsellingactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
