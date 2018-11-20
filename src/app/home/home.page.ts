import { Component } from '@angular/core';
import {DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
    newfruit:string;
    title:string = 'App Home Page';
    fruits:Array <string> = ['mangoes','papaya','banana','durians'];
    constructor (public dataService:DataService) {
      this.readTasks();

    }


  addFruit(){
    if(this.newfruit.length > 0 ){
      this.fruits.push(this.newfruit);
      this.newfruit = ' ';
      this.dataService.storeList(this.fruits)
      .then((response)=> {
        //success
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }

readTasks(){
  this.dataService.loadList()
  .then((response)=> {
    if (response !== null ){
      this.fruits = response;
    }
  })
  .catch((error)=>{
    console.log(error);
  });
}

}
