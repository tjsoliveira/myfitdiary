import { DatabaseProvider } from './../../providers/databaseprovider/databaseprovider';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular';

import { NovoProgressoPage } from '../modals/novo-progresso/novo-progresso';
import { Progresso } from '../../models/progresso.model';
import { Treino } from '../../models/treino.model';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  progressos: Observable<Progresso[]>
  treinos: Observable<Treino[]>;

  hoje: string = new Date().toISOString().substring(0, 10).replace('/\//g', '-');
  hojePtBr: string;
  treino: string;

  constructor(
    private db: DatabaseProvider,
    private modalCtrl: ModalController) {

      this.hojePtBr = moment().format('L').replace('/\//g', '-');
  }


  ionViewWillEnter(){
    this.treinos = this.db.getTreinosCollection().valueChanges();
    this.progressos = this.db.getProgressosHoje(this.hoje);
  }

  novoProgresso(){
    let modal = this.modalCtrl.create(NovoProgressoPage, {treino: this.treino});
    modal.present();
  }

}
