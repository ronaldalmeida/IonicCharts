import { Component,Renderer } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import { HomePage } from '../../pages/home/home'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  data:any;
  //array of selected list items data
  selectedDataItems: any = [];
  // count of selected list items
  // if more than 2, compare button is set to visble
  selectedItemCount: number=0;
  constructor(public navCtrl: NavController,private http:Http,private renderer: Renderer,public alertCtrl: AlertController) {
    // get Json data from file
           this.http.get('./assets/data/housing_compare_app.json')
                   .subscribe(res => this.data = res.json());
  }

  //Highlight selected list item
  //Add data of list item to array
  //if exists, remove list item data from array and un highlight it.
  //prevent selection of more than 4 list items
  onItemSelect(data:any,event:any)
   { 
    debugger;
    var selectedId = event.currentTarget.id;
    // if number of seleted items is less than 4 and the selected list item is not in the array
     if(this.selectedItemCount <4 && this.selectedDataItems.find(x => x.Id == selectedId) == undefined)
     {
      this.selectedItemCount++;      
      this.selectedDataItems.push(data);
      //Add a class attribure so we can change the CSS of the selected item to make it Gray
      this.renderer.setElementClass(event.target,"selected",true);
    }

    //if the selected list item is in the array
     else if( this.selectedDataItems.find(x => x.Id == selectedId) != undefined)
     {
     this.selectedItemCount--; 
     //Remove the class 
     this.renderer.setElementClass(event.target,"selected",false);
     //remove Item from array with matching Id
     this.selectedDataItems.splice(this.selectedDataItems.findIndex(x => x.Id == selectedId),1);
    }
    //more than 4 selections
    else if(this.selectedItemCount >=4)
      {let alert = this.alertCtrl.create({
        title: 'Hey!',
        subTitle: 'At a maximum 4 items can be compared',
        buttons: ['OK']
      });
      alert.present();
    }
   }

   compareClick()
   {
     this.navCtrl.push(HomePage,{data:this.selectedDataItems});
   }

}
 