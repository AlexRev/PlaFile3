import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepathsComponent } from './filepaths.component';

describe('FilepathsComponent', () => {
  let component: FilepathsComponent;
  let fixture: ComponentFixture<FilepathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilepathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilepathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
