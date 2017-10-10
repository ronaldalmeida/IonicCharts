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
        data.forEach(element => {
        graphData ["data"] = element.AreaSpace_SQFT + ","+element.EstimatedRent +","+element.StdDev_SQFT; 
        this.graphdatasets.push(graphData);
        });
      }
     ionViewDidLoad() {
         this.radarChart = new Chart(this.radarCanvas.nativeElement, {
  
             type: 'radar',
             data: {
                 labels: ["AreaSpace_SQFT", "EstimatedRent", "StdDev_SQFT"],
                 datasets: [{
                     data: [this.data[0].AreaSpace_SQFT,this.data[0].EstimatedRent, this.data[0].StdDev_SQFT],
                     backgroundColor: [
                         'rgba(221, 199, 32, 0.2)'
                     ],
                     borderColor: [
                         'rgba(255,99,132,1)'
                     ],
                     borderWidth: 1
                 }]
             },
             options: {
              scale: {
                  // Hides the scale
                  display: true
              }
          }
  
         });
         
  
        }
      }