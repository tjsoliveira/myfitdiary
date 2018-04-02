import { Exercicio } from './../../models/exercicio.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Treino } from '../../models/treino.model';
import { Progresso } from '../../models/progresso.model';
import { Serie } from '../../models/serie.model';

@Injectable()
export class DatabaseProvider {

  constructor(private firestore: AngularFirestore) {

  }

  getTreinosCollection(): AngularFirestoreCollection<Treino> {
    return this.firestore.collection<Treino>('treinos');
  }

  getExerciciosCollection(treinoId: string): AngularFirestoreCollection<Exercicio>{
    return this.firestore.collection('treinos').doc(treinoId).collection('exercicios');
  }

  getSeriesCollection(treinoId: string, exercicioName: string): AngularFirestoreCollection<Serie>{
    return this.firestore.collection('treinos').doc(treinoId).collection('exercicios').doc(exercicioName).collection<Serie>('series');
  }

  getProgressosCollection(): AngularFirestoreCollection<Progresso> {
    return this.firestore.collection<Progresso>('progressos');
  }

  getProgressosHoje(dataHoje: string): Observable<Progresso[]> {
    return this.firestore.collection<Progresso>('progressos', ref => ref.where('data', '==', dataHoje)).valueChanges();
  }

  firestoreGetNewId(): string {
    return this.firestore.createId();
  }

  novoTreino(treino: Treino): Promise<void> {
    const id = this.firestoreGetNewId();
    return this.getTreinosCollection().doc(id).set({id: id, name: treino.name, descricao: treino.descricao});
  }

  novoExercicio(treinoId: string, exercicio: Exercicio): Promise<void>{
    return this.getExerciciosCollection(treinoId).doc(exercicio.name).set(
      {name: exercicio.name, descricao: exercicio.descricao});
  }

  novaSerie(treinoId: string, exercicioName: string, serie: Serie){
    this.getSeriesCollection(treinoId, exercicioName).doc(serie.ordemExecucao.toString()).set({
      ordemExecucao: serie.ordemExecucao,
      minReps: serie.minReps,
      maxReps: serie.maxReps,
      intervalo: serie.intervalo
    });
  }

  deleteTreino(id: string){
    this.getTreinosCollection().doc(id).update({}).then(() => {
      this.getTreinosCollection().doc(id).delete();
    })
  }

  deleteExercicio(treinoId: string, exercicioName: string){
    this.getExerciciosCollection(treinoId).doc(exercicioName).delete();
  }

  deleteSerie(treinoId: string, exercicioName: string, serieId: number) {
    this.getSeriesCollection(treinoId, exercicioName).doc(serieId.toString()).delete();
  }
}
