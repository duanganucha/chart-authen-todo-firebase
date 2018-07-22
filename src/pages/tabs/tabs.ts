import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TodoPage } from '../todo/todo';
import { SchedulePage } from '../schedule/schedule';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TodoPage ;
  tab3Root = SchedulePage;
  
  constructor() {

  }
}
