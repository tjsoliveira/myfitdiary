export class Serie {

  ordemExecucao: number;
  minReps: number;
  maxReps: number;
  intervalo: number;

  constructor(ordemExecucao: number, minReps: number, maxReps: number, intervalo: number){
    this.ordemExecucao = ordemExecucao;
    this.minReps = minReps;
    this.maxReps = maxReps;
    this.intervalo = intervalo;
  }

}
