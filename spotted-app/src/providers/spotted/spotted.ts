import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SpottedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpottedProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) {
    this.storage.clear();
    console.log('Hello SpottedProvider Provider');
  }
 
  public insert(spotted: Spotted) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, spotted);
  }
 
  public update(key: string, spotted: Spotted) {
    return this.save(key, spotted);
  }
 
  private save(key: string, spotted: Spotted) {
    return this.storage.set(key, spotted);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }
 
  public getAll() {
 
    let spotteds: SpottedList[] = [];
 
    return this.storage.forEach((value: Spotted, key: string, iterationNumber: Number) => {
      let spotted = new SpottedList();
      spotted.key = key;
      spotted.spotted = value
      spotteds.push(spotted);
    })
      .then(() => {
        return Promise.resolve(spotteds);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
 
export class Spotted {
  texto: string;
  foto;
}
 
export class SpottedList {
  key: string;
  spotted: Spotted;
}
