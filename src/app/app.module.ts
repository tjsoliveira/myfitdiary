import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './environment';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DatabaseProvider } from '../providers/databaseprovider/databaseprovider';
import { DetalheExercicioPage } from './../pages/treino/detalhe-exercicio/detalhe-exercicio';
import { DetalheTreinoPage } from './../pages/treino/detalhe-treino/detalhe-treino';
import { HomePage } from '../pages/home/home';
import { NovoProgressoPage } from '../pages/modals/novo-progresso/novo-progresso';
import { TabsPage } from '../pages/tabs/tabs';
import { TreinoPage } from './../pages/treino/treino';

@NgModule({
  declarations: [
    MyApp,
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
    DetalheExercicioPage,
    DetalheTreinoPage,
    HomePage,
    NovoProgressoPage,
    TreinoPage,
    TabsPage
  ],
  providers: [
    DatabaseProvider,
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
