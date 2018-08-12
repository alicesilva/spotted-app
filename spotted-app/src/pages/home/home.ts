import { Component } from '@angular/core';
import { ModalController, NavController, NavParams} from 'ionic-angular';
import { AddCardPage } from '../add-card/add-card';
import {SpottedProvider} from '../../providers/spotted/spotted'
import { Observable } from 'rxjs/Observable';
import { Spotted } from '../../models/spotted';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  likeCard:Boolean = false

  spotteds: Array<any>
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams,
    private spottedProvider: SpottedProvider) {
    this.spottedProvider.getAll().valueChanges().subscribe(spotteds=>{
      this.spotteds = spotteds
      console.log("datas", spotteds)
    },(err)=>{
      console.log("probleme : ", err)
    });
  }

  ionViewDidEnter() {
  }
  
  calculaDate(second, minute, hour){
     let hourAtual = new Date

  }
  like(data){
    this.spottedProvider.updateLike(data);
  }

  addCard(){
    this.navCtrl.push(AddCardPage);
  }

}
