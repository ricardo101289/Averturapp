import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})
export class HomePage {

  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
