import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AddSpottedPage} from '../pages/add-spotted/add-spotted';
import { SpottedProvider } from '../providers/spotted/spotted';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { ComentarioProvider } from '../providers/comentario/comentario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddSpottedPage,
    ComentariosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCOiT918ExQJS6lLIMpr67nxcC2A_9Nugc",
      authDomain: "spotted-4a6d0.firebaseapp.com",
      databaseURL: "https://spotted-4a6d0.firebaseio.com/",
      projectId: "spotted-4a6d0",
      storageBucket: "gs://spotted-4a6d0.appspot.com",
      messagingSenderId: "89368252269"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddSpottedPage,
    ComentariosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpottedProvider,
    DatePipe,
    Camera,
    File,
    ComentarioProvider

  ]
})
export class AppModule {}
