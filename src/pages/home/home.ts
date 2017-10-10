import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
     @ViewChild('radarCanvas') radarCanvas;
  
     radarChart:any;
     data:any
     graphdatasets:any=[];
     constructor(public navCtrl: NavController, public navParams: NavParams) {
      // get data passed from navigation   
      this.data = this.navParams.get('data');
      debugger;
      this.buildData(this.data)
     }
      buildData(data:any){
     
        var graphData = [];
        for (var j = 0; j < data.length; j++) {    
            this.graphdatasets[j] = 
                {
                    backgroundColor: ['rgba(220,220,220,0.5)'],
                    borderColor : ['rgba(220,220,220,1)'],
                    data : [ data[j].AreaSpace_SQFT,data[j].EstimatedRent,data[j].StdDev_SQFT]
                }
            }
      }
     ionViewDidLoad() {
         this.radarChart = new Chart(this.radarCanvas.nativeElement, {
  
             type: 'radar',
             data: {
                    labels: ["AreaSpace_SQFT", "EstimatedRent", "StdDev_SQFT"],
                    datasets: this.graphdatasets,
                    options: {
                    scale: {
                  // Hides the scale
                            display: true
                         }}
                    }
  
                });
  
        }
      }