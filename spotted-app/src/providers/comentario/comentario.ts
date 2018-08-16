import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comentario } from '../../models/comentarios';

/*
  Generated class for the ComentarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComentarioProvider {

  private PATH = 'comentarios/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello ComentarioProvider Provider');
  }

  getAll(keySpotted: string) {
    return this.db.list(this.PATH, ref => ref.orderByChild('spotted').equalTo(keySpotted));
  }
 
  save(comentario: Comentario) {
    comentario.key = this.generateRandomKey()
    return new Promise((resolve, reject) => {
        this.db.list(this.PATH).push(comentario).then(() => resolve());
      })
  }

  generateRandomKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


}
