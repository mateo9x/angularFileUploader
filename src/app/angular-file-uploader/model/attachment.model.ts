export class Attachment {
  id: string;
  file: File;
  status: AttachmentStatus;

  constructor(id: string, file: File, status: AttachmentStatus) {
    this.id = id;
    this.file = file;
    this.status = status;
  }
}

export enum AttachmentStatus {
  ADDED = 'ADDED',
  UPLOADING = 'UPLOADING',
  UPLOAD_SUCCESS = 'UPLOAD_SUCCESS',
  UPLOAD_ERROR = 'UPLOAD_ERROR'
}
