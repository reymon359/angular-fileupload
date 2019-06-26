import { Injectable } from '@angular/core';

// Firebase stuff
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private IMAGES_FOLDER = 'img'; // Firebase folder

  constructor(private db: AngularFirestore) { }

  uploadImagesFirebase(images: FileItem[]) {
    console.log(images);
  }



  private saveImage(image: { name: string, url: string }) {

    this.db.collection(`/${this.IMAGES_FOLDER}`)
      .add(image);

  }




}
