import { Component } from '@angular/core';
import {DataService } from '../data.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
    title:string = 'Todo List';
    tasks:Array <Task> = [];
    taskInput:string = '';
    listTitle = ' Todo List';
    now:number;
    constructor (public dataService:DataService) {
      this.readTasks();
      this.now = new Date().getTime();

    }
    createTask(taskName:string){
      let taskDate = new Date().getTime();
      let task = {name:taskName , date: taskDate, status: false };
      return task;
    }


  addTask(){
    if(this.taskInput.length > 0 ){
      this.tasks.push(this.createTask(this.taskInput) );
      this.taskInput = ' ';
      this.dataService.storeList(this.tasks)
      .then((response)=> {
        //success
      })
      .catch((error) => {
        console.log(error);
      });
      this.sortItems();
    }

  }

readTasks(){
  this.dataService.loadList()
  .then( (response) => {
    if (response !== null ){
      this.tasks = <Array<Task>>response;
    }
  })
  .catch((error)=>{
    console.log(error);
  });
}

//change a task's status
changeStatus(date){
  this.tasks.forEach( (task)  => {
    if (task.date == date ){
      task.status = task.status ? false : true;
    }

  });
  this.dataService.storeList(this.tasks);
  this.sortItems();

}

deleteItem(date){
  this.tasks.forEach((task,index) => {
    if (task.date == date ){
      this.tasks.splice( index, 1);
    }
  });
  this.dataService.storeList(this.tasks);
  this.sortItems();
}

formatDate(date:number){
  let diff = this.now - date;
  let seconds = diff /1000;
  if (seconds < 60 ){
    return 'just now ';
  }
  else if (seconds >= 60 && seconds <=3600){
    let mins = Math.floor(seconds / 60);
    let mUnit = mins == 1 ? 'minute' : 'minutes';
    return mins + ' ' + mUnit + ' ago ';
  }
}

  sortItems(){
    //sort by date
    this.tasks.sort( (task1,task2 ) => {
      if (task1.date < task2.date ){ return 1 }
      if (task1.date > task2.date ){ return -1 }
      if (task1.date == task2.date ){ return 0 }
    });

    this.dataService.storeList(this.tasks);
  }


}
