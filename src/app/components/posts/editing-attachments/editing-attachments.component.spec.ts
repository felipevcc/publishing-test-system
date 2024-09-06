import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingAttachmentsComponent } from './editing-attachments.component';

describe('EditingAttachmentsComponent', () => {
  let component: EditingAttachmentsComponent;
  let fixture: ComponentFixture<EditingAttachmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditingAttachmentsComponent]
    });
    fixture = TestBed.createComponent(EditingAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
