import { Attachment } from "./attachment.interface";

export interface Post {
  text: string;
  attachments: Attachment[];
  createdAt: Date
}
