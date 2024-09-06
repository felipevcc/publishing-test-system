import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Attachment } from 'src/app/models/post/attachment.interface';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  @Output() saveImage = new EventEmitter<{ selectedPhotoToEdit: Attachment, croppedImage: string }>();

  @ViewChild('uploadInput') uploadInput!: any;

  selectedPhotoToEdit: Attachment | null = null;
  croppedImage: any = '';

  constructor() {
    this.attachments = new FormArray<any>([]);
  }

  ngOnInit() { }

  closePostModal() {
    this.closeModal.emit();
  }
  closeView() {
    this.resetEditView();
    this.closeEditView.emit();
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

  onImageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImage = URL.createObjectURL(event.blob);
    }
  }

  saveImageChanges() {
    if (!this.selectedPhotoToEdit || !this.croppedImage || this.croppedImage == '') return;
    this.saveImage.emit({
      selectedPhotoToEdit: this.selectedPhotoToEdit,
      croppedImage: this.croppedImage
    });
    this.closeView();
  }

  resetEditView() {
    this.selectedPhotoToEdit = null;
    this.croppedImage = '';
  }

}
