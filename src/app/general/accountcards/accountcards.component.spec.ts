import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcardsComponent } from './accountcards.component';

describe('AccountcardsComponent', () => {
  let component: AccountcardsComponent;
  let fixture: ComponentFixture<AccountcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
