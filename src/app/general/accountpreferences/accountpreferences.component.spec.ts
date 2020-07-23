import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountpreferencesComponent } from './accountpreferences.component';

describe('AccountpreferencesComponent', () => {
  let component: AccountpreferencesComponent;
  let fixture: ComponentFixture<AccountpreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountpreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountpreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
