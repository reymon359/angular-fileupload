import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];



  constructor(public imageUploadService: ImageUploadService) { }

  ngOnInit() {
  }

  uploadImages() {
  this.imageUploadService.uploadImagesFirebase(this.files); 
  }

}
