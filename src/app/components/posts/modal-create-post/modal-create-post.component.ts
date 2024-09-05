import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Attachment } from 'src/app/models/post/attachment.interface';
import { Post } from 'src/app/models/post/post.interface';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-post',
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.scss']
})
export class ModalCreatePostComponent {
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('imageInput') imageInput!: any;
  @ViewChild('videoInput') videoInput!: any;
  @ViewChild('uploadInput') uploadInput!: any;

  modalRef: NgbModalRef | undefined;
  postForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      text: [''],
      attachments: this.fb.array([])
    });
  }

  ngOnInit() {}

  open() {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true
    });
  }

  closeModal() {
    if (this.isEmptyForm()) {
      this.modalRef?.close();
      this.resetForm();
      return;
    }
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: 'Si sales, perderás lo que has hecho.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Salir',
      customClass: {
        popup: 'custom-swal-alert'
      }
    }).then(res => {
      if (res.isConfirmed) {
        this.modalRef?.close();
        this.resetForm();
      }
    });
  }

  addEmoji(event: any) {
    const { emoji } = event;
    const currentFormText = this.postForm.get('text')?.value || '';
    this.postForm.get('text')?.setValue(currentFormText + emoji.native);
  }

  get attachments(): FormArray {
    return this.postForm.get('attachments') as FormArray;
  }

  onPushFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    if (fileType != 'image' && fileType != 'video') {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'El tipo de archivo no es valido.',
        customClass: {
          popup: 'custom-swal-alert'
        }
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const attachment: Attachment = {
        url: e.target.result,
        file: file,
        type: fileType
      };
      this.attachments.push(this.fb.group(attachment));
    };
    reader.readAsDataURL(file);
  }

  isEmptyForm(): boolean {
    if (!this.attachments.controls.length && this.postForm.get('text')?.value == '') {
      return true;
    }
    return false;
  }

  hasImageAttachment(): boolean {
    return this.attachments.controls.some(control => control.value.type === 'image');
  }

  resetForm() {
    this.postForm.reset({
      text: '',
    });
    this.attachments.clear();
  }

  sendPost() {
    const post: Post = this.postForm.value;
    this.postService.addPost(post);
    this.modalRef?.close();
    this.resetForm();
  }

}
