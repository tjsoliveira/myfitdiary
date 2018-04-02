import { Exercicio } from "./exercicio.model";

export class Treino {

  id: string;
  name: string;
  descricao: string;
  exercicios: Exercicio[] = [];

  constructor(name: string, descricao: string, id?: string){
    this.id = id;
    this.name = name;
    this.descricao = descricao;
  }

}
