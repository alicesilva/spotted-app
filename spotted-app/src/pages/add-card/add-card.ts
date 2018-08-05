import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Spotted, SpottedProvider } from '../../providers/spotted/spotted';

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
    private spottedProvider: SpottedProvider,) {
      this.model = new Spotted();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardPage');
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
