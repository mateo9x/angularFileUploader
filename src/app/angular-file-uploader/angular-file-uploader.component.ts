import {Component, EventEmitter, forwardRef, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Attachment, AttachmentStatus} from './model/attachment.model';

@Component({
  selector: 'angular-file-uploader',
  templateUrl: './angular-file-uploader.component.html',
  styleUrls: ['./angular-file-uploader.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AngularFileUploaderComponent),
      multi: true
    }
  ]
})
export class AngularFileUploaderComponent implements ControlValueAccessor {
  attachments: Attachment[] = [{
    id: '1',
    file: new File([], 'test.png'),
    status: AttachmentStatus.ADDED
  },
    {
      id: '1',
      file: new File([], 'test.png'),
      status: AttachmentStatus.UPLOADING
    },
    {
      id: '1',
      file: new File([], 'test.png'),
      status: AttachmentStatus.UPLOAD_ERROR
    },
    {
      id: '1',
      file: new File([], 'test.png'),
      status: AttachmentStatus.UPLOAD_SUCCESS
    }];
  @Output()
  onFileAdd: EventEmitter<Attachment> = new EventEmitter<Attachment>();
  @Output()
  onFileUpload: EventEmitter<Attachment> = new EventEmitter<Attachment>();
  @Output()
  onFileDelete: EventEmitter<Attachment> = new EventEmitter<Attachment>();
  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
    console.log('registerOnChange', fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
    console.log('registerOnTouched', fn);
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState', isDisabled);
  }

  writeValue(obj: any): void {
    console.log('writeValue', obj);
  }

  addAttachment(fileEvent: any) {
    const file = fileEvent.target.files[0] as File;
    const id = crypto.randomUUID();
    const newAttachment = new Attachment(id, file, AttachmentStatus.ADDED);
    this.attachments.push(newAttachment);
    this.onChange(this.attachments);
    this.onFileAdd.emit(newAttachment);
  }

  uploadAttachment(attachmentId: string) {
    const attachmentToUpload = this.attachments.find((attachment) => attachment.id === attachmentId)!;
    this.attachments = this.attachments.filter((attachment) => attachment !== attachmentToUpload);
    attachmentToUpload.status = AttachmentStatus.UPLOADING;
    this.attachments.push(attachmentToUpload);
    this.onChange(this.attachments);
    this.onFileUpload.emit(attachmentToUpload);
  }

  deleteAttachment(attachmentId: string) {
    const attachmentToDelete = this.attachments.find((attachment) => attachment.id === attachmentId)!;
    this.attachments = this.attachments.filter((attachment) => attachment !== attachmentToDelete);
    this.onChange(this.attachments);
    this.onFileDelete.emit(attachmentToDelete);
  }

}
