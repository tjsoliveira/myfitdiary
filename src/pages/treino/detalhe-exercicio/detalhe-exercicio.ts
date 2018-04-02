import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { DatabaseProvider } from './../../../providers/databaseprovider/databaseprovider';
import { Exercicio } from '../../../models/exercicio.model';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
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
    private db: DatabaseProvider) {

      this.treino = this.navParams.get('treino');
      this.exercicio = this.navParams.get('exercicio');

  }

  ionViewDidLoad(){
    this.seriesCollection = this.db.getSeriesCollection(this.treino, this.exercicio.name);
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
            this.db.novaSerie(this.treino, this.exercicio.name, new Serie(
              data['ordemExecucao'], data['minReps'], data['maxReps'], data['intervalo']));
          }
        }
      ]
    })
    prompt.present();
  }

  excluirSerie(serie: Serie){
    this.db.deleteSerie(this.treino, this.exercicio.name, serie.ordemExecucao);
  }
}
