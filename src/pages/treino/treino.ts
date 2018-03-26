import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Treino } from '../../models/treino.model';
import { DetalheTreinoPage } from './detalhe-treino/detalhe-treino';


@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {

  treinos: Observable<Treino[]>;
  private treinosCollection: AngularFirestoreCollection<Treino>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore) {

      this.treinosCollection = firestore.collection<Treino>('treinos');
      this.treinos = this.treinosCollection.valueChanges();
  }

  novoTreino(){
    let prompt = this.alertCtrl.create({
      title: 'Novo Treino',
      message: 'Informe o nome do novo treino',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Título'
        },
        {
          name: 'descricao',
          placeholder: 'descricao',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Salvar',
          handler: data => {
            const id = this.firestore.createId()
            this.treinosCollection.doc(id).set({id: id, name: data['nome'], descricao: data['descricao']});
          }
        }
      ]
    })
    prompt.present();
  }

  detalheTreino(treino: Treino){
    this.navCtrl.push(DetalheTreinoPage, {treino: treino});
  }

  excluirTreino(treino: Treino){

    let confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: `Você tem certeza de que deseja excluir o treino ${treino.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Apagar',
          handler: () => {
            this.treinosCollection.doc(treino.id).delete();
          }
        }
      ]
    });
    confirm.present();
  }
}
