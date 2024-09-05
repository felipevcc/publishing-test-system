import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-post',
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.scss']
})
export class ModalCreatePostComponent {
  @ViewChild('content') content!: TemplateRef<any>;

  modalRef: NgbModalRef | undefined;
  text: string = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit() {}

  open() {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true
    });
    this.modalRef.hidden.subscribe(() => this.resetForm());
  }

  closeModal() {
    if (this.isEmptyForm()) {
      console.log("close");
      return this.modalRef?.close();
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
      console.log("response", res.isConfirmed);
      if (res.isConfirmed) {
        this.modalRef?.close();
      }
    });
  }

  addEmoji(event: any) {
    const { emoji } = event;
    this.text += emoji.native;
  }

  isEmptyForm(): boolean {
    if (this.text == '') {
      return true;
    }
    return false;
  }

  resetForm() {
    console.log("resetForm");
    this.text = '';
  }

}
