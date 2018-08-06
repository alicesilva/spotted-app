import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Spotted, SpottedProvider } from '../../providers/spotted/spotted';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileProvider } from '../../providers/file/file';

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

  model: Spotted;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,
    private spottedProvider: SpottedProvider, private camera: Camera, public actionSheetCtrl: ActionSheetController,
    private fileProvider: FileProvider) {
      this.model = new Spotted();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardPage');
  }

  addFoto(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Foto',
      buttons: [
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            console.log('Galeria clicada');
            this.selecionaGaleria();
          }
        }, {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.abrirCamera();
          }
        }
      ]
    });
    actionSheet.present();

    /*const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.model.foto = base64Image;
    }, (err) => {
      console.error(err);
    }).catch((error) => {
      console.error(error);
    });*/
  }

  abrirCamera(){
    this.fileProvider.selecionaCamera().then(result => {
      console.log(result);
      if(result != null) {
        this.model.foto = result;
        
        console.log(this.model.foto)
      }
    })
  }

  selecionaGaleria(){

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
    /*this.card.texto = this.texto
    this.card.foto = ""
    console.log(new Date().getSeconds())
    console.log(new Date().getMinutes())
    console.log(new Date().getHours())
    console.log(new Date().getFullYear())
    let date = new Date().toLocaleString()
    console.log(date);
    console.log(date.charAt(0))
    console.log(date.charAt(1))
    console.log(date.charAt(2))
    console.log(date.charAt(3))
    console.log(date.charAt(4))
    this.navCtrl.push(HomePage, this.card);*/
  }

  private saveSpotted() {
      return this.spottedProvider.insert(this.model);
  }

}
