import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellhistoryComponent } from './sellhistory.component';

describe('SellhistoryComponent', () => {
  let component: SellhistoryComponent;
  let fixture: ComponentFixture<SellhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
