import { DetalheExercicioPage } from './../pages/treino/detalhe-exercicio/detalhe-exercicio';
import { DetalheTreinoPage } from './../pages/treino/detalhe-treino/detalhe-treino';
import { environment } from './environment';
import { AngularFireModule } from 'angularfire2';

import { TreinoPage } from './../pages/treino/treino';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NovoProgressoPage } from '../pages/modals/novo-progresso/novo-progresso';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    DetalheExercicioPage,
    DetalheTreinoPage,
    HomePage,
    NovoProgressoPage,
    TreinoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase, 'myfitdiary'),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    DetalheExercicioPage,
    DetalheTreinoPage,
    HomePage,
    NovoProgressoPage,
    TreinoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
