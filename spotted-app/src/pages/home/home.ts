import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddCardPage } from '../add-card/add-card';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  likeCard:Boolean = false
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  like(){
    if(this.likeCard){
      this.likeCard = false;
    }else{
      this.likeCard = true;
    }
  }

  addCard(){
    let profileModal = this.modalCtrl.create(AddCardPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

}
