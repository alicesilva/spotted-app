import { Component } from '@angular/core';
import { ModalController, NavController, NavParams} from 'ionic-angular';
import { AddCardPage } from '../add-card/add-card';
import {SpottedProvider, Spotted, SpottedList} from '../../providers/spotted/spotted'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  likeCard:Boolean = false

  spotteds: SpottedList[]
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams,
    private spottedProvider: SpottedProvider) {
    //let card = {texto: null, foto: null}
    //card.texto = this.navParams.data.texto
    //card.foto = this.navParams.data.foto
    //this.spotteds.push(card)
  }

  ionViewDidEnter() {
    console.log("Aqui")
    this.spottedProvider.getAll()
      .then((result) => {
        this.spotteds = result;
      });
  }

  /*spotteds:any = [{
      texto: "kkkkkk",
      foto: "assets/imgs/teste.jpg",
      dataSecond: 41,
      dataMinute: 34,
      dataHour: 21,
      dateDate: 3,
      dateMes: 8,
      dateAno: 2018
    }]*/

   calculaDate(second, minute, hour){
     let hourAtual = new Date

  }
  like(){
    if(this.likeCard){
      this.likeCard = false;
    }else{
      this.likeCard = true;
    }
  }

  addCard(){
    this.navCtrl.push(AddCardPage);
    /*let profileModal = this.modalCtrl.create(AddCardPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      this.spotteds.push(data);
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

      console.log(data);
    });*/
  }

}
