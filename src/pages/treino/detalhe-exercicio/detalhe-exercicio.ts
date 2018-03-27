import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { Exercicio } from '../../../models/exercicio.model';
import { Serie } from '../../../models/serie.model';

@IonicPage()
@Component({
  selector: 'page-detalhe-exercicio',
  templateUrl: 'detalhe-exercicio.html',
})
export class DetalheExercicioPage {

  treino: string;
  exercicio: Exercicio;
  series: Observable<Serie[]>;
  seriesCollection: AngularFirestoreCollection<Serie>;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private firestore: AngularFirestore) {

      this.treino = this.navParams.get('treino');
      this.exercicio = this.navParams.get('exercicio');
      this.seriesCollection = this.firestore.collection('treinos').doc(this.treino).collection('exercicios').doc(this.exercicio.name).collection('series');
      this.series = this.seriesCollection.valueChanges();
  }

  novaSerie(){
    let prompt = this.alertCtrl.create({
      title: 'Nova Série',
      message: 'Informe os dados da nova série',
      inputs: [
        {
          name: 'ordemExecucao',
          placeholder: 'Ordem de Execução',
          type: 'number'
        },
        {
          name: 'minReps',
          placeholder: 'Mínimo de Repepções',
          type: 'number'
        },
        {
          name: 'maxReps',
          placeholder: 'Máximo de Repetições',
          type: 'number'
        },
        {
          name: 'intervalo',
          placeholder: 'Intervalo',
          type: 'number'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Salvar',
          handler: data => {
            this.seriesCollection.doc(data['ordemExecucao']).set({
              ordemExecucao: data['ordemExecucao'],
              minReps: data['minReps'],
              maxReps: data['maxReps'],
              intervalo: data['intervalo']
            });
          }
        }
      ]
    })
    prompt.present();
  }

  excluirSerie(serie: Serie){

  }
}
