import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileADocComponent } from './file-adoc.component';

describe('FileADocComponent', () => {
  let component: FileADocComponent;
  let fixture: ComponentFixture<FileADocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileADocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileADocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
