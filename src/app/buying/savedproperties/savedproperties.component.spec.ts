import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedpropertiesComponent } from './savedproperties.component';

describe('SavedpropertiesComponent', () => {
  let component: SavedpropertiesComponent;
  let fixture: ComponentFixture<SavedpropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedpropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
