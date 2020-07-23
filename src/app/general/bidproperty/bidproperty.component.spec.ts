import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidpropertyComponent } from './bidproperty.component';

describe('BidpropertyComponent', () => {
  let component: BidpropertyComponent;
  let fixture: ComponentFixture<BidpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
