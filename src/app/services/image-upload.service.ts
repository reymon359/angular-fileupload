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

    // Reference with storage collection 
    const storageRef = firebase.storage().ref();

    for (const item of images) {
      item.uploading = true;
      if (item.progress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.IMAGES_FOLDER}/${item.fileName}`)
          .put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error uploading', error),
        // If everything goes ok
        () => {
          console.log('Image uploaded succesfully');
          uploadTask.snapshot.ref.getDownloadURL().then(
            (onfullfilled: any) => {
              console.log('(promise) the download url is:  ' + onfullfilled);
              item.url = onfullfilled;
              console.log(item.url);
              item.uploading = false;
              this.saveImage({
                name: item.fileName,
                url: item.url
              });
            },
            (onrejected: any) => {
              console.log('(promise) the download url has been rejected');
            });
        }
      );
    }
  }



  private saveImage(image: { name: string, url: string }) {

    this.db.collection(`/${this.IMAGES_FOLDER}`)
      .add(image);

  }




}
