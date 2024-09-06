import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: Post | undefined;

  @ViewChild('postContent') postContent!: TemplateRef<any>;

  modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal, config: NgbCarouselConfig) {
    // Carousel config
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

  ngOnInit() { }

  openContentModal() {
    this.modalRef = this.modalService.open(this.postContent, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }
  closeModal() {
    this.modalRef?.close();
  }

}
