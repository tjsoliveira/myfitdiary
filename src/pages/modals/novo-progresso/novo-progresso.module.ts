import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoProgressoPage } from './novo-progresso';

@NgModule({
  declarations: [
    NovoProgressoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoProgressoPage),
  ],
})
export class NovoProgressoPageModule {}
