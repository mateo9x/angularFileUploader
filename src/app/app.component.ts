import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Attachment} from './angular-file-uploader/model/attachment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-file-uploader';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      attachments: [null, []]
    })
  }

  save() {
    console.log(this.getAttachmentsControl())
  }

  getAttachmentsControl() {
    return this.form.get('attachments') as AbstractControl;
  }

  onFileAdd(attachment: Attachment) {
    console.log('onFileAdd', attachment);
  }

  onFileUpload(attachment: Attachment) {
    console.log('onFileUpload', attachment);
  }

  onFileDelete(attachment: Attachment) {
    console.log('onFileDelete', attachment);
  }
}
