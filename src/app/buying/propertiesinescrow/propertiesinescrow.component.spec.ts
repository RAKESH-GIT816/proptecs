import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesinescrowComponent } from './propertiesinescrow.component';

describe('PropertiesinescrowComponent', () => {
  let component: PropertiesinescrowComponent;
  let fixture: ComponentFixture<PropertiesinescrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesinescrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesinescrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
