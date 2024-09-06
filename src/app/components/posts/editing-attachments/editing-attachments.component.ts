import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Attachment } from 'src/app/models/post/attachment.interface';

@Component({
  selector: 'app-editing-attachments',
  templateUrl: './editing-attachments.component.html',
  styleUrls: ['./editing-attachments.component.scss']
})
export class EditingAttachmentsComponent {
  @Input() attachments: FormArray<any>;
  @Output() closeEditView = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<string>();
  @Output() addAttachment = new EventEmitter<File>();
  @Output() removeAttachment = new EventEmitter<number>();

  @ViewChild('uploadInput') uploadInput!: any;

  selectedPhotoToEdit: Attachment | null = null;

  constructor() {
    this.attachments = new FormArray<any>([]);
  }

  ngOnInit() { }

  closePostModal() {
    this.closeModal.emit();
  }
  closeView() {
    this.closeEditView.emit();
    this.selectedPhotoToEdit = null;
  }

  onPushFile(event: any) {
    this.addAttachment.emit(event);
  }
  onRemoveFile(attachment: any) {
    const index = this.attachments.controls.findIndex(control => control.value.url === attachment.url);
    this.removeAttachment.emit(index);
  }

  editImage(image: Attachment) {
    this.selectedPhotoToEdit = image;
  }
  saveImageChanges(image: Attachment | null = null) {
    // const index = this.attachments.controls.findIndex(control => control.value.url === image.url);
    // this.attachments.controls[index].setValue(image);
    this.closeEditView.emit();
    return;
  }
}
