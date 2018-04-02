import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { TreinoPage } from './../treino/treino';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TreinoPage;

  constructor() {
  }
}
