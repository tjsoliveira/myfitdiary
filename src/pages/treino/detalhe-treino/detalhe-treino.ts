import { DatabaseProvider } from './../../../providers/databaseprovider/databaseprovider';
import { DetalheExercicioPage } from './../detalhe-exercicio/detalhe-exercicio';
import { Exercicio } from './../../../models/exercicio.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Treino } from '../../../models/treino.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-detalhe-treino',
  templateUrl: 'detalhe-treino.html',
})
export class DetalheTreinoPage {

  treino: Treino;
  exerciciosCollection: AngularFirestoreCollection<Exercicio>;
  exercicios: Observable<Exercicio[]>;

  constructor(
    private alertCtrl: AlertController,
    private db: DatabaseProvider,
    private navCtrl: NavController,
    private navParams: NavParams) {

    this.treino = this.navParams.get('treino');
    this.treino.exercicios = [];
    this.exerciciosCollection = this.db.getExerciciosCollection(this.treino.id);
    this.exercicios = this.exerciciosCollection.valueChanges();
  }

  novoExercicio(){
    let prompt = this.alertCtrl.create({
      title: 'Novo Exercicio',
      message: 'Informe o nome do novo exercicio',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Título',
          type: 'text'
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
            this.db.novoExercicio(this.treino.id, new Exercicio(data['nome'], data['descricao']));
            this.treino.exercicios.push(new Exercicio(data['nome'], data['descricao']));
          }
        }
      ]
    })
    prompt.present();
  }

  detalheExercicio(exercicio: Exercicio){
    this.navCtrl.push(DetalheExercicioPage, {treino: this.treino.id, exercicio: exercicio});
  }

  excluirExercicio(exercicio: Exercicio){

    let confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: `Você tem certeza de que deseja excluir o treino ${exercicio.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Apagar',
          handler: () => {
            this.db.deleteExercicio(this.treino.id, exercicio.name);
          }
        }
      ]
    });
    confirm.present();
  }
}
