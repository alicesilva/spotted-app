import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController} from 'ionic-angular';
import { HomePage } from '../home/home';
import {SpottedProvider } from '../../providers/spotted/spotted';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Spotted } from '../../models/spotted';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { DatePipe } from '@angular/common/src/pipes/date_pipe';

/**
 * Generated class for the AddCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html',
})
export class AddCardPage {

  spotted: Spotted
  public cameraImage : String

 // model: Spotted;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,
    private spottedProvider: SpottedProvider, private camera: Camera, public actionSheetCtrl: ActionSheetController) {
      this.spotted = new Spotted();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardPage');
  }

  addFoto():void {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
           this.spottedProvider.uploadFromCamera();
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.spottedProvider.uploadFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }


  addCard() {
    this.saveSpotted()
      .then(() => {
        console.log("Salvou")
        this.navCtrl.pop();
      })
      .catch(() => {
        console.log("Não salvou")
      });
  }

  private saveSpotted() {
    this.spotted.foto = this.spottedProvider.myPhotoURL;
    this.spotted.like = false;
    this.spotted.date = new Date().toLocaleDateString();
    return this.spottedProvider.save(this.spotted)
  }

}
