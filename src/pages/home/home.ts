import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Treino } from '../../models/treino.model';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular';
import { NovoProgressoPage } from '../modals/novo-progresso/novo-progresso';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  treinos: Observable<Treino[]>;
  
  constructor(
    private firestore: AngularFirestore,
    private modalCtrl: ModalController) {

      this.treinos = this.firestore.collection<Treino>('treinos').valueChanges();
  }

  novoProgresso(){ 
    let modal = this.modalCtrl.create(NovoProgressoPage);
    modal.present();
  }

}
