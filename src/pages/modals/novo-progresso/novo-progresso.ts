import { DatabaseProvider } from './../../../providers/databaseprovider/databaseprovider';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';

import { Exercicio } from '../../../models/exercicio.model';
import { Progresso } from './../../../models/progresso.model';
import { Serie } from '../../../models/serie.model';

@IonicPage()
@Component({
  selector: 'page-novo-progresso',
  templateUrl: 'novo-progresso.html',
})
export class NovoProgressoPage {

  exercicios: Observable<Exercicio[]>;
  series: Observable<Serie[]>;
  progressosCollection: AngularFirestoreCollection<Progresso>;
  progressos: Observable<Progresso[]>;
  exercicio: string;
  serieId: string;
  treino: string;
  peso: number;
  dataProgresso: string = new Date().toISOString();

  constructor(
    private alertCtrl: AlertController,
    private db: DatabaseProvider,
    private firestore: AngularFirestore,
    private viewCtrl: ViewController,
    private navParams: NavParams) {
    this.treino = this.navParams.get('treino');
  }

  ionViewWillEnter(){
    this.exercicios = this.db.getExerciciosCollection(this.treino).valueChanges();
    this.progressosCollection = this.db.getProgressosCollection();
    this.progressos = this.progressosCollection.valueChanges();
  }

  changeExercicio(){
    this.series = this.db.getSeriesCollection(this.treino, this.exercicio).valueChanges();
  }

  novoProgresso(){

    const id = this.dataProgresso.substring(0, 10) + this.treino;

    this.firestore.collection('progressos').doc(id).set({
      data: this.dataProgresso.substring(0, 10),
      treino: this.treino
    }).then(()=> {
      this.firestore.collection('progressos').doc(id).collection('exercicios').doc(this.exercicio.replace(/\s/g, "")).set({
      }).then(()=> {
        this.firestore.collection('progressos').doc(id).collection('exercicios').doc(this.exercicio.replace(/\s/g, ""))
          .collection('execucoes').doc(this.serieId).set({
            peso: this.peso
          })
      }).then(()=>{
        let alert = this.alertCtrl.create({
          title: `Progresso salvo com Sucesso!`,
          buttons: ['OK']
        });
        alert.present().then(() => {
          this.viewCtrl.dismiss();
        });
      }).catch((error)=>{
        console.log(error);
      });
    })
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }
}
