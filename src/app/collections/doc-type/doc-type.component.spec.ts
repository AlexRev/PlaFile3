import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypeComponent } from './doc-type.component';

describe('DocTypeComponent', () => {
  let component: DocTypeComponent;
  let fixture: ComponentFixture<DocTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
