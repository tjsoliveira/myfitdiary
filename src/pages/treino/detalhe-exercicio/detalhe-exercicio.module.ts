import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheExercicioPage } from './detalhe-exercicio';

@NgModule({
  declarations: [
    DetalheExercicioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheExercicioPage),
  ],
})
export class DetalheExercicioPageModule {}
