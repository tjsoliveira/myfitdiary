import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheTreinoPage } from './detalhe-treino';

@NgModule({
  declarations: [
    DetalheTreinoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheTreinoPage),
  ],
})
export class DetalheTreinoPageModule {}
