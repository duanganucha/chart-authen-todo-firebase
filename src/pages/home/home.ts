import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Chart } from 'chart.js';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineConvas') lineConvas;

 
  private lineChart: any;
  items;
  xArray: any[] = [];
  yArray: any[] = [];


  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase) {
    this.items = this.afDatabase.object(`chart/data`);

    this.items.snapshotChanges().subscribe(action => {

      this.items = action.payload.val()

      this.xArray.splice(0, this.xArray.length);
      this.yArray.splice(0, this.yArray.length);


      Object.keys(this.items).forEach((key) => {
        this.xArray.push(key);
        this.yArray.push(this.items[key]);
      })

      // Object.entries(this.items).forEach(([key, val]) => {
      //   this.xArray.push(key);
      //   this.yArray.push(val);
      // });


      console.log(this.xArray)
      console.log(this.yArray)

      this.basicChart(this.xArray, this.yArray)

    });

  }

  basicChart(key, value) {

    this.lineChart = new Chart(this.lineConvas.nativeElement, {
      type: 'line',
      data: {
        labels: key,
        datasets: [{
          label: 'Average imcome',
          fill: true,
          lineTension: 0 ,
          backgroundColor: "rgba(77,138,255,0.4)",
          borderColor: "rgba(77,138,255,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(77,138,255,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 8,
          pointHoverBorder: 5,
          pointHoverBackgroundColor: "rgba(77,138,255,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: value,
          spanGaps: false
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Ages',
            }
          }]
        }
      }
    }
    )

  }

  signOut() {
    this.navCtrl.setRoot(LoginPage)
    window.location.reload();
  }

}

export interface Item {
  key: string;
  value: number;
}