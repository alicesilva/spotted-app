import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { Spotted } from '../../models/spotted';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var window: any;

/*
  Generated class for the SpottedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpottedProvider {

  private PATH = 'spotteds/';
  public myPhotoURL = null;

  constructor(private db: AngularFireDatabase, private camera: Camera) {
    console.log('Hello SpottedProvider Provider');
  }

  private takePictureOptions: CameraOptions = {
    allowEdit: false,
    saveToPhotoAlbum: true,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: this.camera.Direction.BACK,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  private galleryOptions: CameraOptions = {
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 720,
    targetHeight: 720,
    correctOrientation: true
  }
 
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('date'));
  }
 
  save(spotted: Spotted) {
    spotted.key = this.generateRandomKey()
    return new Promise((resolve, reject) => {
        this.db.list(this.PATH).push(spotted).then(() => resolve());
      })
  }

  uploadFromCamera() {
    this.camera.getPicture(this.takePictureOptions).then((imagePath) => {
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      return this.uploadToFirebase(imageBlob);//upload the blob
    }).then((url) => {
      return this.saveToDatabase(url);//store reference to storage in database
    }).then((url) => {
      return url;
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  //open the gallery and Return a promise with the image data
  uploadFromGallery() {
    this.camera.getPicture(this.galleryOptions).then((imagePath) => {
      alert('got image path ' + imagePath);
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      alert('got image blob ' + imageBlob);
      return this.uploadToFirebase(imageBlob);//upload the blob
    }).then((uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      return this.saveToDatabase(uploadSnapshot);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  //Upload picture to the firebase storage
  uploadToFirebase(imgBlob: any) {
    var randomNumber = Math.floor(Math.random() * 256);
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(this.PATH + randomNumber + '.jpg');//Firebase storage main path
      let metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };

      let uploadTask = storageRef.put(imgBlob, metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          resolve(this.PATH + randomNumber + '.jpg');
        });
    });
  }

  saveToDatabase(url) {
    let promise = new Promise((resolve, reject) => {
      return firebase.storage().ref(url).getDownloadURL()
      .then(result => {
        console.log(result)
        this.myPhotoURL = result;
          resolve();
        }).catch(error => {
          reject();
        });
    });
    return promise;

  }
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  generateRandomKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

}
